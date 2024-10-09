import React from "react";
import BlogCard from "./BlogCard";
import { useLocale } from "next-intl";
import { BlogData, blogsData, ITitles } from "@/data/blogs";

const BlogsSection = () => {
  const locale = useLocale();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogsData.map((blog: BlogData) => (
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
