import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            authorName={"ashrrith"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"2nd May 2024"}
          />
          <BlogCard
            authorName={"ashrrith"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"2nd May 2024"}
          />
          <BlogCard
            authorName={"ashrrith"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"2nd May 2024"}
          />
        </div>
      </div>
    </div>
  );
};
