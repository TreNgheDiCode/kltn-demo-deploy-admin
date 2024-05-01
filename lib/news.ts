import { db } from "./db";

export const GetNews = async () => {
  const news = await db.news.findMany({
    include: {
      school: {
        select: {
          name: true,
        },
      },
    },
  });

  return news;
};
