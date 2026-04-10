/**
 * Email error handling utilities
 * Maps Supabase email errors to user-friendly messages
 */

export interface EmailErrorInfo {
  userMessage: string;
  technicalMessage: string;
  code: string;
  isEmailRelated: boolean;
  suggestedAction: string;
}

export const handleEmailError = (error: any): EmailErrorInfo => {
  const errorMessage = error?.message?.toLowerCase() || '';
  const errorCode = error?.status || error?.code || 'UNKNOWN';

  // Email confirmation not enabled - user can proceed
  if (
    errorMessage.includes('email_not_confirmed') ||
    errorMessage.includes('email confirmation') ||
    errorMessage.includes('not verified')
  ) {
    return {
      userMessage: 'تم إنشاء حسابك بنجاح! تحقق من بريدك الإلكتروني لتأكيد الحساب.',
      technicalMessage: 'Email confirmation required but not configured',
      code: 'EMAIL_CONFIRMATION_REQUIRED',
      isEmailRelated: true,
      suggestedAction: 'Check email for confirmation link',
    };
  }

  // Email sending failed
  if (
    errorMessage.includes('error sending email') ||
    errorMessage.includes('failed to send') ||
    errorMessage.includes('smtp') ||
    errorMessage.includes('mail') ||
    errorCode === 422
  ) {
    return {
      userMessage: 'حدث خطأ في إرسال بريد التأكيد. تحقق من إعدادات البريد الإلكتروني في لوحة التحكم.',
      technicalMessage: `Email sending failed: ${error?.message}`,
      code: 'EMAIL_SEND_FAILED',
      isEmailRelated: true,
      suggestedAction: 'Configure email settings in Supabase dashboard',
    };
  }

  // Email already registered
  if (errorMessage.includes('user already registered') || errorCode === 422) {
    return {
      userMessage: 'هذا البريد الإلكتروني مسجل بالفعل',
      technicalMessage: 'Email already exists in the system',
      code: 'USER_ALREADY_EXISTS',
      isEmailRelated: true,
      suggestedAction: 'Use a different email or try logging in',
    };
  }

  // Invalid email format
  if (errorMessage.includes('invalid email') || errorMessage.includes('invalid_credentials')) {
    return {
      userMessage: 'البريد الإلكتروني غير صحيح',
      technicalMessage: 'Invalid email format',
      code: 'INVALID_EMAIL',
      isEmailRelated: true,
      suggestedAction: 'Enter a valid email address',
    };
  }

  // Generic error
  return {
    userMessage: 'فشل إنشاء الحساب. حاول مجدداً.',
    technicalMessage: error?.message || 'Unknown error',
    code: 'UNKNOWN_ERROR',
    isEmailRelated: false,
    suggestedAction: 'Retry or contact support',
  };
};

/**
 * Checks if email service is properly configured in Supabase
 * Returns guidance for fixing email issues
 */
export const getEmailConfigurationGuide = () => {
  return {
    title: 'Email Configuration Guide',
    issues: [
      {
        issue: 'Email confirmation not working',
        solutions: [
          'Disable email confirmation in Supabase Auth settings (for development)',
          'Configure SMTP provider (SendGrid, Mailgun, AWS SES, etc.)',
          'Use Supabase default email service',
        ],
      },
      {
        issue: 'Users can\'t receive confirmation emails',
        solutions: [
          'Check Supabase email provider settings',
          'Verify SMTP credentials are correct',
          'Check spam/junk folder',
          'Ensure sender email is verified',
        ],
      },
    ],
    setupSteps: [
      'Go to Supabase Dashboard > Your Project',
      'Navigate to Authentication > Email',
      'Choose email provider (disable for dev, configure for production)',
      'If using SMTP, enter credentials',
      'Test by signing up with a test email',
    ],
  };
};
