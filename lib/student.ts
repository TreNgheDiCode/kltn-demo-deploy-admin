import { db } from "./db";

export const GetStudentsBySchoolId = async (id: string) => {
  const school = await db.school.findUnique({
    where: {
      id,
    },
  });

  if (!school) return null;

  const students = await db.student.findMany({
    where: {
      schoolId: school.id,
    },
    select: {
      id: true,
      studentCode: true,
      account: {
        select: {
          image: true,
          name: true,
          dob: true,
        },
      },
      program: {
        select: {
          program: {
            select: {
              name: true,
            },
          },
        },
      },
      status: true,
      degreeType: true,
      gradeType: true,
      gradeScore: true,
    },
  });

  return students;
};
