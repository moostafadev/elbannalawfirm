// constants/ads.ts

// ─── WhatsApp ────────────────────────────────────────────────────────────────

export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201000728654";

// ─── House Ads (Fallback ads shown when AdSense fails) ───────────────────────

export const HOUSE_AD_LABEL: Record<LocaleKey, string> = {
  ar: "إعلان",
  en: "Ad",
  fr: "Annonce",
};

interface HouseAdText {
  title: string;
  text: string;
  cta: string;
}

export interface HouseAdConfig {
  id: "consultation" | "inheritance";
  href: string;
  external: boolean;
  image: string;
  texts: Record<LocaleKey, HouseAdText>;
}

export const HOUSE_ADS: HouseAdConfig[] = [
  {
    id: "consultation",
    href: WHATSAPP_URL,
    external: true,
    image: "/logo/logo.png",
    texts: {
      ar: {
        title: "هل تحتاج إلى استشارة قانونية؟",
        text: "تواصل مع مكتب أحمد البنا للمحاماة الآن عبر واتساب واحصل على استشارة تناسب قضيتك.",
        cta: "تواصل عبر واتساب",
      },
      en: {
        title: "Need legal advice?",
        text: "Contact Ahmed Elbanna Law Firm now on WhatsApp and get advice tailored to your case.",
        cta: "Chat on WhatsApp",
      },
      fr: {
        title: "Besoin d'un conseil juridique ?",
        text: "Contactez le cabinet Ahmed Elbanna sur WhatsApp et obtenez un avis adapté à votre dossier.",
        cta: "Écrire sur WhatsApp",
      },
    },
  },
  {
    id: "inheritance",
    href: "/inheritance-calculator",
    external: false,
    image: "/logo/inheritance.png",
    texts: {
      ar: {
        title: "احسب ميراثك مجاناً",
        text: "حاسبة المواريث الشرعية: أدخل الورثة والتركة واعرف الأنصبة خلال ثوانٍ.",
        cta: "جرّب الآن",
      },
      en: {
        title: "Calculate your inheritance for free",
        text: "Our Islamic inheritance calculator: add the heirs and the estate and see the shares in seconds.",
        cta: "Try now",
      },
      fr: {
        title: "Calculez votre héritage gratuitement",
        text: "Notre calculateur d'héritage islamique : ajoutez les héritiers et la succession et obtenez les parts en quelques secondes.",
        cta: "Essayer",
      },
    },
  },
];

// ─── AdSense Ad Slots ────────────────────────────────────────────────────────
// لكل موضع وحدة إعلانية منفصلة في AdSense للحصول على تقارير دقيقة.
// لإنشاء وحدة جديدة:
//   AdSense Dashboard → Ads → By ad unit → Display ads → Responsive
// ثم انسخ قيمة data-ad-slot والصقها بدل القيمة الحالية.
//
// القيم الافتراضية أدناه = نفس الوحدة القديمة مؤقتًا.
// استبدل كل قيمة بـ slot مستقل عند إنشائه في AdSense.

export const AD_SLOTS = {
  /** الصفحة الرئيسية – قسم "من نحن" */
  homeAbout: "9908557793",

  /** صفحة /blog – أسفل قائمة المقالات */
  blogListBottom: "3968915532",

  /** صفحة المقال – إعلان داخلي في منتصف المحتوى */
  blogInline: "9237729098",

  /** صفحة المقال – إعلان أسفل المقال (بعد التعليقات) */
  blogArticleBottom: "5545896093",

  /** صفحة حاسبة المواريث – أسفل الصفحة */
  inheritanceBottom: "1646924395",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;
