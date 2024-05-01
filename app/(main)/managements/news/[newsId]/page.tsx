import { NewsForm } from "@/components/news/news-form";
import { GetNewsById } from "@/lib/news";
import { redirect } from "next/navigation";

const NewsIdPage = async ({
  params: { newsId },
}: {
  params: { newsId: string };
}) => {
  const news = await GetNewsById(newsId);

  if (!news) {
    redirect("/managements/news");
  }

  return (
    <div className="space-y-4">
      <NewsForm initialData={news} isPreview={true} />
    </div>
  );
};

export default NewsIdPage;
