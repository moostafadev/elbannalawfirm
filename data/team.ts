export interface TeamMember {
  id: number;
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  image: string;
  role: {
    ar: string;
    en: string;
    fr: string;
  }[];
}

export const teamData: TeamMember[] = [
  {
    id: 2,
    name: {
      ar: "احمد سيف",
      en: "Ahmed Saif",
      fr: "Ahmed Saif",
    },
    image: "/imgs/team/ahmed_saif.webp",
    role: [{ ar: "محامي", en: "Lawyer", fr: "Avocat" }],
  },
  {
    id: 3,
    name: {
      ar: "بكر مجاهد",
      en: "Bakr Mojahed",
      fr: "Bakr Mojahed",
    },
    image: "/imgs/team/bakr.webp",
    role: [{ ar: "محامي", en: "Lawyer", fr: "Avocat" }],
  },
  {
    id: 4,
    name: {
      ar: "عمرو جاد",
      en: "Amr Gad",
      fr: "Amr Gad",
    },
    image: "/imgs/team/amr.webp",
    role: [{ ar: "محامي", en: "Lawyer", fr: "Avocat" }],
  },
  {
    id: 5,
    name: {
      ar: "ايمن سمير البحراوي",
      en: "Ayman Samir ElBahrawy",
      fr: "Ayman Samir ElBahrawy",
    },
    image: "/imgs/team/ayman.webp",
    role: [{ ar: "محامي", en: "Lawyer", fr: "Avocat" }],
  },
];
