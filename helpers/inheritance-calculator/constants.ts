import { HeirType } from "./types";

export const heirOptions: {
  label: { [key: string]: string };
  value: HeirType;
  img: { src: string; alt: string };
}[] = [
  {
    label: { ar: "الزوج", en: "Husband", fr: "Mari" },
    value: "husband",
    img: { src: "/imgs/people/man_1.png", alt: "husband" },
  },
  {
    label: { ar: "الزوجة", en: "Wife", fr: "Femme" },
    value: "wife",
    img: { src: "/imgs/people/women_4.png", alt: "wife" },
  },
  {
    label: { ar: "الجد", en: "Grandfather", fr: "Grand-père" },
    value: "grandfather",
    img: { src: "/imgs/people/man_5.png", alt: "grandfather" },
  },
  {
    label: { ar: "الأب", en: "Father", fr: "Père" },
    value: "father",
    img: { src: "/imgs/people/man_7.png", alt: "father" },
  },
  {
    label: { ar: "الأم", en: "Mother", fr: "Mère" },
    value: "mother",
    img: { src: "/imgs/people/women_6.png", alt: "mother" },
  },
  {
    label: {
      ar: "الجدة لأب",
      en: "Paternal Grandmother",
      fr: "Grand-mère paternelle",
    },
    value: "paternal_grandmother",
    img: { src: "/imgs/people/women_2.png", alt: "paternal_grandmother" },
  },
  {
    label: {
      ar: "الجدة لأم",
      en: "Maternal Grandmother",
      fr: "Grand-mère maternelle",
    },
    value: "maternal_grandmother",
    img: { src: "/imgs/people/women_3.png", alt: "maternal_grandmother" },
  },
  {
    label: { ar: "الابن", en: "Son", fr: "Fils" },
    value: "son",
    img: { src: "/imgs/people/man_3.png", alt: "son" },
  },
  {
    label: { ar: "الابنة", en: "Daughter", fr: "Fille" },
    value: "daughter",
    img: { src: "/imgs/people/women_5.png", alt: "daughter" },
  },
  {
    label: { ar: "ابن الابن", en: "Son of Son", fr: "Fils de fils" },
    value: "son_son",
    img: { src: "/imgs/people/man_6.png", alt: "son_son" },
  },
  {
    label: { ar: "بنت الابن", en: "Daughter of Son", fr: "Fille de fils" },
    value: "son_daughter",
    img: { src: "/imgs/people/women.png", alt: "son_daughter" },
  },
  {
    label: { ar: "الأخ الشقيق", en: "Full Brother", fr: "Frère germain" },
    value: "full_brother",
    img: { src: "/imgs/people/man.png", alt: "full_brother" },
  },
  {
    label: { ar: "الأخت الشقيقة", en: "Full Sister", fr: "Sœur germaine" },
    value: "full_sister",
    img: { src: "/imgs/people/women.png", alt: "full_sister" },
  },
  {
    label: { ar: "الأخ لأب", en: "Paternal Brother", fr: "Frère paternel" },
    value: "paternal_brother",
    img: { src: "/imgs/people/man_4.png", alt: "paternal_brother" },
  },
  {
    label: { ar: "الأخت لأب", en: "Paternal Sister", fr: "Sœur paternelle" },
    value: "paternal_sister",
    img: { src: "/imgs/people/women_4.png", alt: "paternal_sister" },
  },
  {
    label: { ar: "الأخ لأم", en: "Maternal Brother", fr: "Frère maternel" },
    value: "maternal_brother",
    img: { src: "/imgs/people/man_7.png", alt: "maternal_brother" },
  },
  {
    label: { ar: "الأخت لأم", en: "Maternal Sister", fr: "Sœur maternelle" },
    value: "maternal_sister",
    img: { src: "/imgs/people/women_5.png", alt: "maternal_sister" },
  },
  {
    label: { ar: "العم الشقيق", en: "Full Uncle", fr: "Oncle germain" },
    value: "full_uncle",
    img: { src: "/imgs/people/man_2.png", alt: "full_uncle" },
  },
  {
    label: { ar: "العم لأب", en: "Paternal Uncle", fr: "Oncle paternel" },
    value: "paternal_uncle",
    img: { src: "/imgs/people/man_8.png", alt: "paternal_uncle" },
  },
  {
    label: {
      ar: "ابن العم الشقيق",
      en: "Son of Full Uncle",
      fr: "Fils de l'oncle germain",
    },
    value: "son_of_full_uncle",
    img: { src: "/imgs/people/man_9.png", alt: "son_of_full_uncle" },
  },
  {
    label: {
      ar: "ابن العم لأب",
      en: "Son of Paternal Uncle",
      fr: "Fils de l'oncle paternel",
    },
    value: "son_of_paternal_uncle",
    img: { src: "/imgs/people/man_6.png", alt: "son_of_paternal_uncle" },
  },
  {
    label: {
      ar: "ابن الأخ الشقيق",
      en: "Son of Full Brother",
      fr: "Fils du frère germain",
    },
    value: "son_of_full_brother",
    img: { src: "/imgs/people/man_7.png", alt: "son_of_full_brother" },
  },
  {
    label: {
      ar: "ابن الأخ لأب",
      en: "Son of Paternal Brother",
      fr: "Fils du frère paternel",
    },
    value: "son_of_paternal_brother",
    img: { src: "/imgs/people/man_10.png", alt: "son_of_paternal_brother" },
  },
];
