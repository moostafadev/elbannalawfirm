// constants/contact.ts
export const CONTACT_STATES: Record<
  LocaleKey,
  readonly { value: string; label: string }[]
> = {
  ar: [
    { value: "القاهرة", label: "القاهرة" },
    { value: "الجيزة", label: "الجيزة" },
    { value: "الإسكندرية", label: "الإسكندرية" },
    { value: "الدقهلية", label: "الدقهلية" },
    { value: "الشرقية", label: "الشرقية" },
    { value: "البحيرة", label: "البحيرة" },
    { value: "الغربية", label: "الغربية" },
    { value: "المنوفية", label: "المنوفية" },
    { value: "القليوبية", label: "القليوبية" },
    { value: "الفيوم", label: "الفيوم" },
    { value: "بني سويف", label: "بني سويف" },
    { value: "المنيا", label: "المنيا" },
    { value: "أسيوط", label: "أسيوط" },
    { value: "سوهاج", label: "سوهاج" },
    { value: "قنا", label: "قنا" },
    { value: "أسوان", label: "أسوان" },
    { value: "الأقصر", label: "الأقصر" },
    { value: "دمياط", label: "دمياط" },
    { value: "بورسعيد", label: "بورسعيد" },
    { value: "الإسماعيلية", label: "الإسماعيلية" },
    { value: "السويس", label: "السويس" },
    { value: "مطروح", label: "مطروح" },
    { value: "شمال سيناء", label: "شمال سيناء" },
    { value: "جنوب سيناء", label: "جنوب سيناء" },
    { value: "البحر الأحمر", label: "البحر الأحمر" },
    { value: "الوادي الجديد", label: "الوادي الجديد" },
  ],
  en: [
    { value: "القاهرة", label: "Cairo" },
    { value: "الجيزة", label: "Giza" },
    { value: "الإسكندرية", label: "Alexandria" },
    { value: "الدقهلية", label: "Dakahlia" },
    { value: "الشرقية", label: "Sharqia" },
    { value: "البحيرة", label: "Beheira" },
    { value: "الغربية", label: "Gharbia" },
    { value: "المنوفية", label: "Menoufia" },
    { value: "القليوبية", label: "Qalyubia" },
    { value: "الفيوم", label: "Fayoum" },
    { value: "بني سويف", label: "Beni Suef" },
    { value: "المنيا", label: "Minya" },
    { value: "أسيوط", label: "Assiut" },
    { value: "سوهاج", label: "Sohag" },
    { value: "قنا", label: "Qena" },
    { value: "أسوان", label: "Aswan" },
    { value: "الأقصر", label: "Luxor" },
    { value: "دمياط", label: "Damietta" },
    { value: "بورسعيد", label: "Port Said" },
    { value: "الإسماعيلية", label: "Ismailia" },
    { value: "السويس", label: "Suez" },
    { value: "مطروح", label: "Matrouh" },
    { value: "شمال سيناء", label: "North Sinai" },
    { value: "جنوب سيناء", label: "South Sinai" },
    { value: "البحر الأحمر", label: "Red Sea" },
    { value: "الوادي الجديد", label: "New Valley" },
  ],
  fr: [
    { value: "القاهرة", label: "Le Caire" },
    { value: "الجيزة", label: "Gizeh" },
    { value: "الإسكندرية", label: "Alexandrie" },
    { value: "الدقهلية", label: "Dakahlia" },
    { value: "الشرقية", label: "Sharqia" },
    { value: "البحيرة", label: "Beheira" },
    { value: "الغربية", label: "Gharbia" },
    { value: "المنوفية", label: "Menoufia" },
    { value: "القليوبية", label: "Qalyubia" },
    { value: "الفيوم", label: "Fayoum" },
    { value: "بني سويف", label: "Beni Suef" },
    { value: "المنيا", label: "Minya" },
    { value: "أسيوط", label: "Assiout" },
    { value: "سوهاج", label: "Sohag" },
    { value: "قنا", label: "Qena" },
    { value: "أسوان", label: "Aswan" },
    { value: "الأقصر", label: "Luxor" },
    { value: "دمياط", label: "Damiette" },
    { value: "بورسعيد", label: "Port-Saïd" },
    { value: "الإسماعيلية", label: "Ismaïlia" },
    { value: "السويس", label: "Suez" },
    { value: "مطروح", label: "Matrouh" },
    { value: "شمال سيناء", label: "Sinai Nord" },
    { value: "جنوب سيناء", label: "Sinai Sud" },
    { value: "البحر الأحمر", label: "Mer Rouge" },
    { value: "الوادي الجديد", label: "Nouvelle Vallée" },
  ],
};

export const CONTACT_VALIDATION: Record<
  LocaleKey,
  {
    name: { required: string; min: string };
    phone: { required: string; invalid: string };
    age: { required: string; invalid: string };
    state: { required: string };
    subject: { required: string; min: string; max: string };
  }
> = {
  ar: {
    name: {
      required: "يجب إدخال الاسم.",
      min: "يجب أن يتكون الاسم من حرفين على الأقل.",
    },
    phone: {
      required: "يرجى إدخال رقم الهاتف.",
      invalid: "رقم الهاتف غير صالح.",
    },
    age: { required: "يرجى إدخال العمر.", invalid: "العمر يجب أن يكون رقمًا." },
    state: { required: "يرجى تحديد المحافظة." },
    subject: {
      required: "يرجى إدخال الموضوع.",
      min: "يجب أن يتكون الموضوع من 3 أحرف على الأقل.",
      max: "يجب أن لا يتجاوز الموضوع 1000 حرف.",
    },
  },
  en: {
    name: {
      required: "Name is required.",
      min: "Username must be at least 2 characters.",
    },
    phone: {
      required: "Phone number is required.",
      invalid: "Phone number is invalid.",
    },
    age: { required: "Age is required.", invalid: "Age must be a number." },
    state: { required: "State is required." },
    subject: {
      required: "Subject is required.",
      min: "Subject must be at least 3 characters long.",
      max: "Subject must not exceed 1000 characters.",
    },
  },
  fr: {
    name: {
      required: "Le nom est requis.",
      min: "Le nom doit comporter au moins 2 caractères.",
    },
    phone: {
      required: "Le numéro de téléphone est requis.",
      invalid: "Le numéro de téléphone est invalide.",
    },
    age: {
      required: "L'âge est requis.",
      invalid: "L'âge doit être un nombre.",
    },
    state: { required: "L'état est requis." },
    subject: {
      required: "Le sujet est requis.",
      min: "Le sujet doit comporter au moins 3 caractères.",
      max: "Le sujet ne doit pas dépasser 1000 caractères.",
    },
  },
};

export const CONTACT_TEXTS: Record<
  LocaleKey,
  { note: string; redirecting: string; submit: string; whatsappPhone: string }
> = {
  ar: {
    note: "ملاحظة",
    redirecting: "سيتم تحويلك إلى واتساب...",
    submit: "إرسال",
    whatsappPhone: "201000728654",
  },
  en: {
    note: "Note",
    redirecting: "You will be redirected to WhatsApp...",
    submit: "Submit",
    whatsappPhone: "201000728654",
  },
  fr: {
    note: "Note",
    redirecting: "Vous allez être redirigé vers WhatsApp...",
    submit: "Soumettre",
    whatsappPhone: "201000728654",
  },
};
