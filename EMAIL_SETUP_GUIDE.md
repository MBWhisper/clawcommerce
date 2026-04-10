# Email Configuration Guide for ClawCommerce

## Problem: "Error sending confirmation email"

This error occurs when Supabase cannot send confirmation emails. Here's how to fix it:

## Solution Options

### Option 1: Disable Email Confirmation (Development/Testing)
This is the quickest way to test without email setup.

1. Go to your Supabase Dashboard: https://supabase.com
2. Navigate to your ClawCommerce project
3. Go to **Authentication** → **Providers** → **Email**
4. Disable **Confirm email** toggle
5. Users will be able to sign up immediately without email confirmation

### Option 2: Configure SMTP for Production
For production, you need to set up email sending:

1. **Access Supabase Email Settings:**
   - Go to **Authentication** → **Email Templates**
   - Your project needs a sender email configured

2. **Using Supabase's Built-in Email (Recommended for Development):**
   - Supabase provides a default email service
   - Make sure your project has this enabled in the Email provider settings

3. **Using Custom SMTP (for Production):**
   - Go to **Project Settings** → **Email**
   - Configure your SMTP provider (e.g., SendGrid, Mailgun, AWS SES)
   - Add SMTP credentials:
     - SMTP Host
     - SMTP Port
     - SMTP User
     - SMTP Password

### Option 3: Check Supabase Configuration

In your project settings, verify:

1. **Email Confirmation Required:**
   - Go to **Authentication** → **Providers** → **Email**
   - Check the toggle state
   - If enabled, email sending must be configured

2. **Email Configuration in Auth:**
   - Go to **Authentication** → **Email Templates**
   - Ensure the confirmation email template is configured
   - Check the sender email address

3. **Available Email Providers:**
   - Default (Supabase-provided)
   - Custom SMTP
   - SendGrid
   - Mailgun
   - AWS SES
   - SparkPost

## Testing the Fix

After configuration:

1. Try signing up with a test email
2. Check your email for the confirmation link
3. Click the link to verify your account
4. You should be redirected to the dashboard

## Troubleshooting

If you still get errors:

1. **Check Supabase Logs:**
   - Go to **Logs** in Supabase Dashboard
   - Look for email-related errors

2. **Verify SMTP Credentials:**
   - Make sure the SMTP credentials are correct
   - Test SMTP connection in Supabase settings

3. **Check Email Whitelist:**
   - Some providers require whitelisting of email addresses
   - Make sure your domain is configured

4. **Rate Limiting:**
   - Some providers have rate limits
   - Wait and retry if you've hit a limit

## Current Project Status

- Environment variables: ✓ Configured
- Database schema: ✓ Configured
- Email service: ⚠️ Needs configuration (see above)

## Next Steps

1. Choose an email solution (Option 1, 2, or 3)
2. Configure it in your Supabase project
3. Test by signing up with a test account
4. The app will automatically send confirmation emails

For more information, visit: https://supabase.com/docs/guides/auth/auth-email
