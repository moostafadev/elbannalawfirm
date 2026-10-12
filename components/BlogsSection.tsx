import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Animation from "./Animation";
import BlogCard from "./BlogCard";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import { BLOG_TEXTS } from "@/constants/blog";
import { toLocaleKey } from "@/lib/locale";
import { getPublishedBlogs } from "@/services/blog.service";

const HOME_BLOGS_LIMIT = 3;

const ViewAllButton = ({
  label,
  locale,
}: {
  label: string;
  locale: LocaleKey;
}) => {
  const Icon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <Animation className="self-center">
      <Link href="/blog" title={label}>
        <CustomButton
          size="fit"
          color="yellow"
          className="!gap-2 !px-6 !py-2.5"
        >
          <span className="font-semibold">{label}</span>
          <Icon size={18} strokeWidth={2.5} />
        </CustomButton>
      </Link>
    </Animation>
  );
};

const BlogsSection = async ({ locale }: { locale: string }) => {
  const key = toLocaleKey(locale);
  const texts = BLOG_TEXTS[key];
  const res = await getPublishedBlogs({ lang: key, limit: HOME_BLOGS_LIMIT });

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-6">
        <Heading>{texts.latestArticles}</Heading>
        <Animation>
          <p className="max-w-2xl text-center text-base font-semibold text-neutral-700 md:text-lg">
            {texts.latestArticlesDescription}
          </p>
        </Animation>
      </div>

      {/* Body */}
      {!res.success ? (
        <div className="flex flex-col items-center gap-8">
          <p role="alert" className="py-8 text-center text-red-600">
            {texts.loadError}
          </p>
          <ViewAllButton label={texts.viewAll} locale={key} />
        </div>
      ) : res.data.blogs.length === 0 ? (
        <div className="flex flex-col items-center gap-8">
          <p className="py-8 text-center text-muted-foreground">
            {texts.emptyBlogs}
          </p>
          <ViewAllButton label={texts.viewAll} locale={key} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {res.data.blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} locale={key} />
            ))}
          </div>
          <ViewAllButton label={texts.viewAll} locale={key} />
        </>
      )}
    </div>
  );
};

export default BlogsSection;
