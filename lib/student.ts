import { db } from "./db";

export const GetStudentById = async (id: string) => {
  const student = await db.student.findUnique({
    where: {
      id,
    },
    include: {
      account: true,
      location: {
        include: {
          location: true,
        },
      },
      profile: true,
      program: {
        include: {
          program: true,
        },
      },
      school: true,
    },
  });

  return student;
};

export const GetStudentFeedbacks = async (email?: string, phone?: string) => {
  const feedbacks = await db.feedback.findMany({
    where: {
      AND: [
        {
          email,
        },
        {
          phone,
        },
      ],
    },
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
