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
