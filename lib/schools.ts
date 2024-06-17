import { db } from "./db";

export const GetSchoolsLib = async () => {
  const names = db.school.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
    },
  });

  return names;
};

export const GetSchoolsById = async (id: string) => {
  const school = await db.school.findUnique({
    where: {
      id,
    },
    include: {
      scholarships: {
        include: {
          images: true,
          owners: {
            include: {
              student: true,
            },
          },
        },
      },
      news: true,
      locations: {
        select: {
          id: true,
          name: true,
          address: true,
          cover: true,
          isMain: true,
        },
      },
      programs: {
        select: {
          id: true,
          name: true,
          description: true,
          cover: true,
          isPublished: true,
        },
      },
      galleries: {
        select: {
          name: true,
        },
      },
      students: {
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
      },
    },
  });

  return school;
};

export const GetSchoolsByIdApi = async (id: string) => {
  const school = await db.school.findUnique({
    where: {
      id,
      isPublished: true,
    },
    include: {
      locations: {
        select: {
          name: true,
          address: true,
        },
      },
      programs: {
        select: {
          name: true,
        },
      },
      galleries: {
        select: {
          name: true,
        },
      },
      students: {
        select: {
          account: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return school;
};
