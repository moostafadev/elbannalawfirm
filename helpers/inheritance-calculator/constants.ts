import { HeirType } from "./types";

export const heirOptions: {
  label: { [key: string]: string };
  value: HeirType;
}[] = [
  { label: { ar: "الزوج", en: "husband", fr: "mari" }, value: "husband" },
  { label: { ar: "الزوجة", en: "wife", fr: "femme" }, value: "wife" },
  { label: { ar: "الأب", en: "father", fr: "père" }, value: "father" },
  { label: { ar: "الأم", en: "mother", fr: "mère" }, value: "mother" },
  {
    label: { ar: "الجد", en: "grandfather", fr: "grand-père" },
    value: "grandfather",
  },
  {
    label: {
      ar: "الجدة لأم",
      en: "maternal_grandmother",
      fr: "grand-mère maternelle",
    },
    value: "maternal_grandmother",
  },
  {
    label: {
      ar: "الجدة لأب",
      en: "paternal_grandmother",
      fr: "grand-mère paternelle",
    },
    value: "paternal_grandmother",
  },
  { label: { ar: "الابن", en: "son", fr: "fils" }, value: "son" },
  { label: { ar: "الابنة", en: "daughter", fr: "fille" }, value: "daughter" },
  {
    label: { ar: "ابن الابن", en: "son_son", fr: "fils de fils" },
    value: "son_son",
  },
  {
    label: { ar: "بنت الابن", en: "son_daughter", fr: "fille de fils" },
    value: "son_daughter",
  },
  {
    label: { ar: "الأخ الشقيق", en: "full_brother", fr: "frère germain" },
    value: "full_brother",
  },
  {
    label: { ar: "الأخت الشقيقة", en: "full_sister", fr: "sœur germain" },
    value: "full_sister",
  },
  {
    label: { ar: "الأخ لأب", en: "paternal_brother", fr: "frère paternel" },
    value: "paternal_brother",
  },
  {
    label: { ar: "الأخت لأب", en: "paternal_sister", fr: "sœur paternelle" },
    value: "paternal_sister",
  },
  {
    label: { ar: "الأخ لأم", en: "maternal_brother", fr: "frère maternel" },
    value: "maternal_brother",
  },
  {
    label: { ar: "الأخت لأم", en: "maternal_sister", fr: "sœur maternelle" },
    value: "maternal_sister",
  },
  {
    label: { ar: "العم الشقيق", en: "full_uncle", fr: "oncle germain" },
    value: "full_uncle",
  },
  {
    label: { ar: "العم لأب", en: "paternal_uncle", fr: "oncle paternel" },
    value: "paternal_uncle",
  },
  {
    label: {
      ar: "ابن العم الشقيق",
      en: "son_of_full_uncle",
      fr: "fils de l'oncle germain",
    },
    value: "son_of_full_uncle",
  },
  {
    label: {
      ar: "ابن العم لأب",
      en: "son_of_paternal_uncle",
      fr: "fils de l'oncle paternel",
    },
    value: "son_of_paternal_uncle",
  },
  {
    label: {
      ar: "ابن الأخ الشقيق",
      en: "son_of_full_brother",
      fr: "fils du frère germain",
    },
    value: "son_of_full_brother",
  },
  {
    label: {
      ar: "ابن الأخ لأب",
      en: "son_of_paternal_brother",
      fr: "fils du frère paternel",
    },
    value: "son_of_paternal_brother",
  },
];
