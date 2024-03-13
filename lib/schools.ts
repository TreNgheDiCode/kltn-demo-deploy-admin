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
