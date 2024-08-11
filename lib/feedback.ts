import { db } from "./db";

export const GetFeedbackLib = async () => {
  const feedbacks = await db.feedback.findMany({
    include: {
      school: {
        select: {
          name: true,
          logo: true,
          color: true,
        },
      },
    },
  });

  return feedbacks;
};
