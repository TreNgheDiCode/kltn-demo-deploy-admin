import { HeadingNews } from "@/components/news/heading-news";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-4">
      <HeadingNews />
      {children}
    </div>
  );
};

export default NewsLayout;
