import React from "react";
import Image from "next/image";
import { Scale } from "lucide-react";

const AUTHOR_TEXTS = {
  ar: {
    label: "بقلم",
    name: "أحمد البنا",
    role: "محامٍ ومستشار قانوني",
    bio: "محامٍ مصري متخصص في الأحوال الشخصية والقضايا التجارية والجنائية، بخبرة تمتد لسنوات في المحاكم المصرية.",
  },
  en: {
    label: "Written by",
    name: "Ahmed Elbanna",
    role: "Lawyer & Legal Consultant",
    bio: "Egyptian lawyer specialized in family, commercial, and criminal law, with years of experience in Egyptian courts.",
  },
  fr: {
    label: "Écrit par",
    name: "Ahmed Elbanna",
    role: "Avocat et consultant juridique",
    bio: "Avocat égyptien spécialisé en droit de la famille, commercial et pénal, avec des années d'expérience devant les tribunaux égyptiens.",
  },
} as const;

const AuthorBio = ({ locale }: { locale: LocaleKey }) => {
  const t = AUTHOR_TEXTS[locale];

  return (
    <section className="flex flex-col items-start gap-4 rounded-lg border-2 border-primary/30 bg-[#bb99111a] p-5 md:flex-row md:items-center md:gap-6 md:p-6">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-primary bg-white">
        <Image
          src="/logo/logo.png"
          alt={t.name}
          width={80}
          height={80}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
          <Scale size={14} />
          {t.label}
        </span>
        <h3 className="text-lg font-bold text-neutral-900 md:text-xl">
          {t.name}
        </h3>
        <p className="text-xs font-medium text-primary md:text-sm">{t.role}</p>
        <p className="mt-1 text-sm leading-relaxed text-neutral-700 md:text-base">
          {t.bio}
        </p>
      </div>
    </section>
  );
};

export default AuthorBio;
