import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'هل أحتاج خبرة تقنية لإنشاء متجر؟',
      answer: 'لا، ClawCommerce مصممة للجميع! لا تحتاج أي خبرة في البرمجة أو التصميم. واجهتنا سهلة الاستخدام وتمكنك من إنشاء متجر احترافي في دقائق. كما نوفر فيديوهات تعليمية ودعم مباشر لمساعدتك.',
    },
    {
      question: 'ما هي طرق الدفع المتاحة للعملاء؟',
      answer: 'نوفر تكامل مع أكثر من 20 بوابة دفع تشمل: مدى، فيزا، ماستركارد، Apple Pay، STC Pay، تمارا، تابي، والدفع عند الاستلام. يمكنك تفعيل البوابات التي تناسبك بنقرة واحدة.',
    },
    {
      question: 'كيف يتم الشحن والتوصيل؟',
      answer: 'نوفر تكامل تلقائي مع أكبر شركات الشحن: أرامكس، SMSA، DHL، فيديكس، وغيرها. يتم حساب تكلفة الشحن تلقائياً وتتبع الشحنات من لوحة التحكم. كما يمكنك تحديد مناطق الشحن والأسعار حسب رغبتك.',
    },
    {
      question: 'هل يمكنني استخدام نطاقي الخاص؟',
      answer: 'نعم! يمكنك ربط نطاقك الخاص (مثل www.متجرك.com) مجاناً مع جميع الخطط. كما نوفر شهادة SSL مجانية لحماية متجرك وبيانات عملائك.',
    },
    {
      question: 'ما هي سياسة الإلغاء واسترداد المال؟',
      answer: 'نقدم ضمان استرداد المال خلال 30 يوماً بدون أي أسئلة. إذا لم تكن راضياً عن الخدمة، سنعيد لك كامل المبلغ. كما يمكنك إلغاء اشتراكك في أي وقت.',
    },
    {
      question: 'هل تقدمون دعم فني؟',
      answer: 'نعم، نقدم دعم فني على مدار الساعة 24/7 عبر الدردشة المباشرة، الواتساب، البريد الإلكتروني، والهاتف. فريقنا من المتخصصين جاهز لمساعدتك في أي وقت باللغة العربية.',
    },
    {
      question: 'هل يمكنني نقل متجري من منصة أخرى؟',
      answer: 'بالتأكيد! نوفر خدمة نقل مجانية لمتجرك من أي منصة أخرى (سلة، زد، شوبيفاي، ووكومرس). فريقنا سينقل جميع منتجاتك، عملائك، وطلباتك بدون أي فقدان للبيانات.',
    },
    {
      question: 'كم منتج يمكنني إضافته؟',
      answer: 'خطة المبتدئ تسمح بـ 100 منتج، بينما خطة الاحترافي والمؤسسي توفر منتجات غير محدودة. يمكنك إضافة منتجات بسيطة أو متغيرة (بألوان ومقاسات مختلفة).',
    },
  ];

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ❓ أسئلة شائعة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            هل لديك
            <span className="gradient-text"> أسئلة؟</span>
          </h2>
          <p className="text-xl text-gray-600">
            إليك إجابات لأكثر الأسئلة شيوعاً. لم تجد إجابتك؟ تواصل معنا!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-orange-200 shadow-lg shadow-orange-100' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <span className={`font-bold text-lg transition-colors ${
                  openIndex === index ? 'text-orange-600' : 'text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  openIndex === index 
                    ? 'bg-orange-500 text-white rotate-180' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-gray-50 rounded-3xl">
          <p className="text-gray-600 mb-4">لم تجد إجابة سؤالك؟</p>
          <button className="btn-primary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>تواصل مع فريق الدعم</span>
          </button>
        </div>
      </div>
    </section>
  );
}
