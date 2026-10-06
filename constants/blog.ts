export const LOCALE_TAGS: Record<LocaleKey, string> = {
  ar: "ar-EG",
  en: "en-US",
  fr: "fr-FR",
};

export const BLOGS_PAGE_SIZE = 9;

interface BlogTexts {
  home: string;
  readMore: string;
  emptyBlogs: string;
  loadError: string;
  blogs: string;
  blogsDescription: string;
  featured: string;
  allCategories: string;
  categories: string;
  mostViewed: string;
  views: string;
  minRead: string;
  tableOfContents: string;
  share: string;
  copyLink: string;
  linkCopied: string;
  relatedArticles: string;
  previous: string;
  next: string;
  viewAll: string;
}

export const BLOG_TEXTS: Record<LocaleKey, BlogTexts> = {
  ar: {
    home: "الصفحة الرئيسية",
    readMore: "قراءة المزيد",
    emptyBlogs: "لا توجد مقالات منشورة حالياً",
    loadError: "تعذر تحميل المقالات، حاول مرة أخرى لاحقاً",
    blogs: "المدونة القانونية",
    blogsDescription:
      "مقالات ونصائح قانونية من مكتب أحمد البنا للمحاماة لتعرف حقوقك وتتصرف بوعي",
    featured: "مقال مميز",
    allCategories: "الكل",
    categories: "التصنيفات",
    mostViewed: "الأكثر مشاهدة",
    views: "مشاهدة",
    minRead: "دقيقة قراءة",
    tableOfContents: "محتويات المقال",
    share: "شارك المقال",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ الرابط",
    relatedArticles: "مقالات ذات صلة",
    previous: "السابق",
    next: "التالي",
    viewAll: "عرض كل المقالات",
  },
  en: {
    home: "Home",
    readMore: "Read more",
    emptyBlogs: "No articles published yet",
    loadError: "Failed to load articles, please try again later",
    blogs: "Legal Blog",
    blogsDescription:
      "Legal articles and tips from Ahmed Elbanna Law Firm to help you know your rights and act with confidence",
    featured: "Featured article",
    allCategories: "All",
    categories: "Categories",
    mostViewed: "Most viewed",
    views: "views",
    minRead: "min read",
    tableOfContents: "Table of contents",
    share: "Share this article",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    relatedArticles: "Related articles",
    previous: "Previous",
    next: "Next",
    viewAll: "View all articles",
  },
  fr: {
    home: "Page d'accueil",
    readMore: "Lire la suite",
    emptyBlogs: "Aucun article publié pour le moment",
    loadError: "Impossible de charger les articles, réessayez plus tard",
    blogs: "Blog juridique",
    blogsDescription:
      "Articles et conseils juridiques du cabinet Ahmed Elbanna pour connaître vos droits et agir en toute confiance",
    featured: "Article à la une",
    allCategories: "Tous",
    categories: "Catégories",
    mostViewed: "Les plus lus",
    views: "vues",
    minRead: "min de lecture",
    tableOfContents: "Sommaire",
    share: "Partager l'article",
    copyLink: "Copier le lien",
    linkCopied: "Lien copié",
    relatedArticles: "Articles similaires",
    previous: "Précédent",
    next: "Suivant",
    viewAll: "Voir tous les articles",
  },
};
