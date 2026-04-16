import type { VercelRequest, VercelResponse } from '@vercel/node';

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const signature = request.headers['stripe-signature'] as string;
  
  if (!signature) {
    return response.status(400).json({ error: 'Missing signature' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return response.status(500).json({ error: 'Webhook secret not configured' });
  }

  try {
    const body = request.body;
    const event = body as StripeEvent;

    console.log(`Processing event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as {
          mode: string;
          subscription: string;
          customer: string;
          metadata?: Record<string, string>;
        };
        
        if (session.mode === 'subscription' && session.subscription) {
          const userId = session.metadata?.user_id;
          const storeId = session.metadata?.store_id;
          
          if (userId && storeId) {
            await fetch(`${process.env.SUPABASE_URL}/rest/v1/subscriptions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Prefer': 'resolution=merge',
              },
              body: JSON.stringify({
                user_id: userId,
                store_id: storeId,
                stripe_customer_id: session.customer,
                stripe_subscription_id: session.subscription,
                plan: 'starter',
                status: 'active',
              }),
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as {
          id: string;
          status: string;
          current_period_start: number;
          current_period_end: number;
          cancel_at_period_end: boolean;
          items: {
            data: Array<{
              price: {
                id: string;
              };
            }>;
          };
        };

        const plan = mapPriceIdToPlan(subscription.items.data[0]?.price.id);
        
        await fetch(
          `${process.env.SUPABASE_URL}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            },
            body: JSON.stringify({
              plan,
              status: mapStripeStatus(subscription.status),
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            }),
          }
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as { id: string };
        
        await fetch(
          `${process.env.SUPABASE_URL}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            },
            body: JSON.stringify({
              status: 'cancelled',
              updated_at: new Date().toISOString(),
            }),
          }
        );
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as {
          subscription: string;
          current_period_start: number;
          current_period_end: number;
        };
        
        if (invoice.subscription) {
          await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/subscriptions?stripe_subscription_id=eq.${invoice.subscription}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              },
              body: JSON.stringify({
                status: 'active',
                current_period_start: new Date(invoice.current_period_start * 1000).toISOString(),
                current_period_end: new Date(invoice.current_period_end * 1000).toISOString(),
                updated_at: new Date().toISOString(),
              }),
            }
          );
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as { subscription: string };
        
        if (invoice.subscription) {
          await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/subscriptions?stripe_subscription_id=eq.${invoice.subscription}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              },
              body: JSON.stringify({
                status: 'past_due',
                updated_at: new Date().toISOString(),
              }),
            }
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return response.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return response.status(400).json({ error: 'Webhook validation failed' });
  }
}

function mapPriceIdToPlan(priceId: string): string {
  const priceToPlans: Record<string, string> = {
    'price_starter_monthly': 'starter',
    'price_starter_yearly': 'starter',
    'price_professional_monthly': 'professional',
    'price_professional_yearly': 'professional',
    'price_enterprise_monthly': 'enterprise',
    'price_enterprise_yearly': 'enterprise',
  };
  
  return priceToPlans[priceId] || 'free';
}

function mapStripeStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'active',
    canceled: 'cancelled',
    incomplete: 'past_due',
    incomplete_expired: 'expired',
    past_due: 'past_due',
    trialing: 'trialing',
    unpaid: 'past_due',
  };
  
  return statusMap[status] || 'active';
}