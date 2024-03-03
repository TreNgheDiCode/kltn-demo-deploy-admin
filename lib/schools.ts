import { db } from "./db";

export const GetSchoolsLib = async () => {
  const names = db.school.findMany({
    select: {
      id: true,
      name: true,
      logoUrl: true,
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
      users: {
        select: {
          name: true,
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
      users: {
        select: {
          name: true,
        },
      },
    },
  });

  return school;
};
