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

export const GetNewsById = async (id: string) => {
  const news = await db.news.findUnique({
    where: {
      id,
    },
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
