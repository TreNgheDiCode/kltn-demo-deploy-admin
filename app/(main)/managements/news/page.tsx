import { GetNews } from "@/lib/news";
import { NewsTable } from "../../../../components/news/news-table";

const NewsPage = async () => {
  const news = await GetNews();

  return (
    <div className="space-y-4">
      <NewsTable news={news} />
    </div>
  );
};

export default NewsPage;
