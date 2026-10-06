import type { EngagementError } from "@/types/engagement";

export const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

export const COMMENT_LIMITS = {
  nameMin: 2,
  nameMax: 50,
  contentMin: 3,
  contentMax: 1000,
} as const;

export const COMMENTS_PAGE_SIZE = 10;
export const RATE_LIMIT_SHORT_MS = 30_000;
export const RATE_LIMIT_HOUR_MS = 3_600_000;
export const RATE_LIMIT_HOUR_MAX = 5;

interface EngagementTexts {
  like: string;
  unlike: string;
  commentsTitle: string;
  noComments: string;
  leaveComment: string;
  nameLabel: string;
  commentLabel: string;
  submit: string;
  commentAdded: string;
  loadMore: string;
  errors: Record<EngagementError, string>;
}

export const ENGAGEMENT_TEXTS: Record<LocaleKey, EngagementTexts> = {
  ar: {
    like: "أعجبني",
    unlike: "إلغاء الإعجاب",
    commentsTitle: "التعليقات",
    noComments: "لا توجد تعليقات بعد، كن أول من يعلّق",
    leaveComment: "اترك تعليقاً",
    nameLabel: "الاسم",
    commentLabel: "تعليقك",
    submit: "إرسال التعليق",
    commentAdded: "تم نشر تعليقك",
    loadMore: "عرض المزيد من التعليقات",
    errors: {
      invalid: "تحقق من البيانات المدخلة (ممنوع وضع روابط) وحاول مرة أخرى",
      spam: "تعذر إرسال التعليق",
      rate_limit: "لقد أرسلت تعليقات كثيرة، انتظر قليلاً ثم حاول مرة أخرى",
      not_found: "هذا المقال غير متاح",
      failed: "حدث خطأ، حاول مرة أخرى لاحقاً",
    },
  },
  en: {
    like: "Like",
    unlike: "Remove like",
    commentsTitle: "Comments",
    noComments: "No comments yet, be the first to comment",
    leaveComment: "Leave a comment",
    nameLabel: "Name",
    commentLabel: "Your comment",
    submit: "Post comment",
    commentAdded: "Your comment was posted",
    loadMore: "Load more comments",
    errors: {
      invalid: "Please check your input (links are not allowed) and try again",
      spam: "Your comment could not be sent",
      rate_limit: "You are commenting too fast, please wait and try again",
      not_found: "This article is not available",
      failed: "Something went wrong, please try again later",
    },
  },
  fr: {
    like: "J'aime",
    unlike: "Retirer le j'aime",
    commentsTitle: "Commentaires",
    noComments: "Aucun commentaire pour le moment, soyez le premier",
    leaveComment: "Laisser un commentaire",
    nameLabel: "Nom",
    commentLabel: "Votre commentaire",
    submit: "Publier le commentaire",
    commentAdded: "Votre commentaire a été publié",
    loadMore: "Voir plus de commentaires",
    errors: {
      invalid: "Vérifiez vos données (les liens sont interdits) et réessayez",
      spam: "Impossible d'envoyer le commentaire",
      rate_limit: "Vous commentez trop vite, patientez puis réessayez",
      not_found: "Cet article n'est pas disponible",
      failed: "Une erreur est survenue, réessayez plus tard",
    },
  },
};

export const getErrorMessage = (
  locale: LocaleKey,
  error: EngagementError,
): string => ENGAGEMENT_TEXTS[locale].errors[error];
