import { HeadingNews } from "@/components/news/heading-news";
import { GetNews } from "@/lib/news";
import { NewsTable } from "./news-table";

const NewsPage = async () => {
  const news = await GetNews();

  return (
    <div className="space-y-4">
      <HeadingNews />
      <NewsTable news={news} />
    </div>
  );
};

export default NewsPage;
