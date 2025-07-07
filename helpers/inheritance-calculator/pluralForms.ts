import { HeirType } from "./types";

export const pluralForms: {
  [key in HeirType]?: {
    ar: { one: string; two: string; few: string; many: string };
    en: string;
    fr: string;
  };
} = {
  husband: {
    ar: { one: "الزوج", two: "زوجان", few: "أزواج", many: "من الأزواج" },
    en: "husbands",
    fr: "maris",
  },
  wife: {
    ar: { one: "الزوجة", two: "زوجتان", few: "زوجات", many: "من الزوجات" },
    en: "wives",
    fr: "femmes",
  },
  grandfather: {
    ar: { one: "الجد", two: "جدان", few: "أجداد", many: "من الأجداد" },
    en: "grandfathers",
    fr: "grands-pères",
  },
  father: {
    ar: { one: "الأب", two: "أبان", few: "آباء", many: "من الآباء" },
    en: "fathers",
    fr: "pères",
  },
  mother: {
    ar: { one: "الأم", two: "أمان", few: "أمهات", many: "من الأمهات" },
    en: "mothers",
    fr: "mères",
  },
  paternal_grandmother: {
    ar: {
      one: "الجدة لأب",
      two: "جدتان لأب",
      few: "جدات لأب",
      many: "من الجدات لأب",
    },
    en: "paternal grandmothers",
    fr: "grands-mères paternelles",
  },
  maternal_grandmother: {
    ar: {
      one: "الجدة لأم",
      two: "جدتان لأم",
      few: "جدات لأم",
      many: "من الجدات لأم",
    },
    en: "maternal grandmothers",
    fr: "grands-mères maternelles",
  },
  son: {
    ar: { one: "الابن", two: "ابنان", few: "أبناء", many: "من الأبناء" },
    en: "sons",
    fr: "fils",
  },
  daughter: {
    ar: { one: "الابنة", two: "ابنتان", few: "بنات", many: "من البنات" },
    en: "daughters",
    fr: "filles",
  },
  son_son: {
    ar: {
      one: "ابن الابن",
      two: "ابنا الابن",
      few: "أبناء الابن",
      many: "من أبناء الابن",
    },
    en: "grandsons",
    fr: "petits-fils",
  },
  son_daughter: {
    ar: {
      one: "بنت الابن",
      two: "بنتا الابن",
      few: "بنات الابن",
      many: "من بنات الابن",
    },
    en: "granddaughters",
    fr: "petites-filles",
  },
  full_brother: {
    ar: {
      one: "الأخ الشقيق",
      two: "أخوان شقيقان",
      few: "إخوة أشقاء",
      many: "من الإخوة الأشقاء",
    },
    en: "full brothers",
    fr: "frères germains",
  },
  full_sister: {
    ar: {
      one: "الأخت الشقيقة",
      two: "أختان شقيقتان",
      few: "أخوات شقيقات",
      many: "من الأخوات الشقيقات",
    },
    en: "full sisters",
    fr: "sœurs germaines",
  },
  paternal_brother: {
    ar: {
      one: "الأخ لأب",
      two: "أخوان لأب",
      few: "إخوة لأب",
      many: "من الإخوة لأب",
    },
    en: "paternal brothers",
    fr: "frères paternels",
  },
  paternal_sister: {
    ar: {
      one: "الأخت لأب",
      two: "أختان لأب",
      few: "أخوات لأب",
      many: "من الأخوات لأب",
    },
    en: "paternal sisters",
    fr: "sœurs paternelles",
  },
  maternal_brother: {
    ar: {
      one: "الأخ لأم",
      two: "أخوان لأم",
      few: "إخوة لأم",
      many: "من الإخوة لأم",
    },
    en: "maternal brothers",
    fr: "frères maternels",
  },
  maternal_sister: {
    ar: {
      one: "الأخت لأم",
      two: "أختان لأم",
      few: "أخوات لأم",
      many: "من الأخوات لأم",
    },
    en: "maternal sisters",
    fr: "sœurs maternelles",
  },
  full_uncle: {
    ar: {
      one: "العم الشقيق",
      two: "عمان شقيقان",
      few: "أعمام أشقاء",
      many: "من الأعمام الأشقاء",
    },
    en: "full uncles",
    fr: "oncles germains",
  },
  paternal_uncle: {
    ar: {
      one: "العم لأب",
      two: "عمان لأب",
      few: "أعمام لأب",
      many: "من الأعمام لأب",
    },
    en: "paternal uncles",
    fr: "oncles paternels",
  },
  son_of_full_uncle: {
    ar: {
      one: "ابن العم الشقيق",
      two: "ابنا العم الشقيق",
      few: "أبناء العم الشقيق",
      many: "من أبناء العم الشقيق",
    },
    en: "cousins (full uncle)",
    fr: "fils des oncles germains",
  },
  son_of_paternal_uncle: {
    ar: {
      one: "ابن العم لأب",
      two: "ابنا العم لأب",
      few: "أبناء العم لأب",
      many: "من أبناء العم لأب",
    },
    en: "cousins (paternal uncle)",
    fr: "fils des oncles paternels",
  },
  son_of_full_brother: {
    ar: {
      one: "ابن الأخ الشقيق",
      two: "ابنا الأخ الشقيق",
      few: "أبناء الأخ الشقيق",
      many: "من أبناء الأخ الشقيق",
    },
    en: "nephews (full brother)",
    fr: "fils des frères germains",
  },
  son_of_paternal_brother: {
    ar: {
      one: "ابن الأخ لأب",
      two: "ابنا الأخ لأب",
      few: "أبناء الأخ لأب",
      many: "من أبناء الأخ لأب",
    },
    en: "nephews (paternal brother)",
    fr: "fils des frères paternels",
  },
};
