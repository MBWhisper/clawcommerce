// Supabase Edge Function for Stripe Webhooks
// Deploy with: supabase functions deploy stripe-webhook

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log(`Processing event: ${event.type}`);

    switch (event.type) {
      // Customer created
      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer;
        console.log('Customer created:', customer.id);
        break;
      }

      // Checkout completed - subscription started
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          
          // Get user and store from metadata
          const userId = session.metadata?.user_id;
          const storeId = session.metadata?.store_id;
          
          if (userId && storeId) {
            // Update or create subscription record
            const { error } = await supabase
              .from('subscriptions')
              .upsert({
                user_id: userId,
                store_id: storeId,
                stripe_customer_id: session.customer as string,
                stripe_subscription_id: subscription.id,
                plan: getPlanFromPriceId(subscription.items.data[0].price.id),
                status: 'active',
                current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
              }, {
                onConflict: 'stripe_subscription_id',
              });

            if (error) {
              console.error('Error updating subscription:', error);
            }
          }
        }
        break;
      }

      // Subscription updated
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const { error } = await supabase
          .from('subscriptions')
          .update({
            plan: getPlanFromPriceId(subscription.items.data[0].price.id),
            status: mapStripeStatus(subscription.status),
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error);
        }
        break;
      }

      // Subscription cancelled
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error);
        }
        break;
      }

      // Invoice paid - subscription renewed
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );

          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription);

          if (error) {
            console.error('Error updating subscription:', error);
          }
        }
        break;
      }

      // Invoice payment failed
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription);

          if (error) {
            console.error('Error updating subscription:', error);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
});

// Helper function to map Stripe price ID to plan name
function getPlanFromPriceId(priceId: string): string {
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

// Helper function to map Stripe subscription status
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
