import BlogsSkeleton from "@/components/Blogs/BlogsSkeleton";

const Loading = () => (
  <div className="container py-10">
    <BlogsSkeleton count={6} />
  </div>
);

export default Loading;
