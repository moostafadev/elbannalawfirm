// constants/inheritance.ts
export const INHERITANCE_TEXTS: Record<
  LocaleKey,
  { blockedHeirsTitle: string; invalidEstate: string; noHeirs: string }
> = {
  ar: {
    blockedHeirsTitle: "الورثة المحجوبون",
    invalidEstate: "الرجاء إدخال قيمة تركة صحيحة.",
    noHeirs: "الرجاء إضافة ورثة قبل الحساب.",
  },
  en: {
    blockedHeirsTitle: "Blocked heirs",
    invalidEstate: "Please enter a valid estate value.",
    noHeirs: "Please add heirs before calculating.",
  },
  fr: {
    blockedHeirsTitle: "Héritiers exclus",
    invalidEstate: "Veuillez saisir une valeur de succession valide.",
    noHeirs: "Veuillez ajouter des héritiers avant de calculer.",
  },
};
