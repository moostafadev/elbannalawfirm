import React from "react";
import BlogCard from "./BlogCard";
import { useLocale } from "next-intl";

interface ITitles {
  ar: string;
  en: string;
  fr: string;
}

export interface BlogData {
  id: number;
  image: string;
  titles: ITitles;
  content: {
    ar: string[];
    en: string[];
    fr: string[];
  };
  link: string;
}

const BlogsSection = () => {
  const locale = useLocale();
  const blogData: BlogData[] = [
    {
      id: 1,
      image: "/imgs/blog_1.jpg",
      titles: {
        ar: "دعوى نفقة الصغار",
        en: "Child Support Lawsuit",
        fr: "Action en Pension Alimentaire pour Enfants",
      },
      content: {
        ar: [
          "هل تعرف أن نفقة الأطفال بعد الطلاق هي حق أساسي يكفله القانون المصري؟",
          "في هذا المقال، نوضح لك كل ما تحتاج معرفته عن دعوى نفقة الصغار وأنواع النفقات التي يجب على الأب توفيرها.",
          "اكتشف التفاصيل القانونية الهامة لحماية حقوق أطفالك وضمان مستقبلهم!",
        ],
        en: [
          "Did you know that child support after divorce is a fundamental right protected by Egyptian law?",
          "In this article, we explain everything you need to know about child support lawsuits and the types of support fathers are required to provide.",
          "Discover important legal details to secure your children's rights and their future!",
        ],
        fr: [
          "Saviez-vous que la pension alimentaire pour enfants après un divorce est un droit fondamental protégé par la loi égyptienne ?",
          "Dans cet article, nous vous expliquons tout ce que vous devez savoir sur les actions en pension alimentaire et les types de soutien que les pères doivent fournir.",
          "Découvrez les détails juridiques importants pour protéger les droits de vos enfants et assurer leur avenir !",
        ],
      },
      link: "/blog/1",
    },
    {
      id: 2,
      image: "/imgs/blog_2.jpg",
      titles: {
        ar: "عقد العمل في القانون المصري",
        en: "Employment Contract in Egyptian Law",
        fr: "Contrat de Travail dans le Droit Égyptien",
      },
      content: {
        ar: [
          "هل تعلم أن عقد العمل هو الأساس الذي ينظم العلاقة بين العامل وصاحب العمل؟",
          "اكتشف في هذا المقال أهم العناصر التي يجب أن يتضمنها عقد العمل في مصر، مثل الأجر، المدة الزمنية، والشروط العامة.",
          "اقرأ المزيد لتعرف كيف تحمي حقوقك وتضمن الالتزام بأحكام القانون في تعاقدات العمل!",
        ],
        en: [
          "Did you know that the employment contract is the cornerstone of the relationship between employees and employers?",
          "In this article, we explore the key components of an employment contract in Egypt, such as wages, duration, and general terms.",
          "Read more to find out how to protect your rights and ensure legal compliance in your employment agreements!",
        ],
        fr: [
          "Saviez-vous que le contrat de travail est la pierre angulaire de la relation entre l'employé et l'employeur ?",
          "Dans cet article, nous explorons les éléments clés d'un contrat de travail en Égypte, tels que le salaire, la durée, et les conditions générales.",
          "Lisez la suite pour découvrir comment protéger vos droits et garantir la conformité juridique de vos accords de travail !",
        ],
      },
      link: "/blog/2",
    },
    {
      id: 3,
      image: "/imgs/blog_3.jpg",
      titles: {
        ar: "حرية القتل الإلكتروني",
        en: "Freedom of Cyber Killing",
        fr: "Liberté du Meurtre Électronique",
      },
      content: {
        ar: [
          'رغم عدم وجود مصطلح رسمي لـ "جريمة القتل الإلكتروني"، يمكن استخدامه لوصف حالات نادرة تسبب فيها التحريض أو التكنولوجيا الرقمية الوفاة.',
          "أمثلة تشمل التحريض على الانتحار عبر الإنترنت أو التلاعب بالأجهزة الطبية رقمياً.",
          "تعرف على المزيد حول هذه التحديات القانونية النادرة في العصر الرقمي.",
        ],
        en: [
          'Though there is no official term for "cyber killing," it can describe rare cases where online incitement or digital technology causes death.',
          "Examples include inciting suicide online or manipulating medical devices digitally.",
          "Learn more about these rare legal challenges in the digital age.",
        ],
        fr: [
          "Bien qu'il n'existe pas de terme officiel pour \"meurtre électronique\", il peut décrire des cas rares où l'incitation en ligne ou la technologie numérique cause la mort.",
          "Des exemples incluent l'incitation au suicide en ligne ou la manipulation numérique des dispositifs médicaux.",
          "Découvrez ces défis juridiques rares à l'ère numérique.",
        ],
      },
      link: "/blog/3",
    },
  ];
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogData.map((blog: BlogData) => (
        <BlogCard
          key={blog.id}
          image={blog.image}
          title={blog.titles[locale as keyof ITitles]}
          link={blog.link}
        >
          {blog.content[locale as keyof ITitles].map(
            (paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            )
          )}
        </BlogCard>
      ))}
    </div>
  );
};

export default BlogsSection;
