import { db } from "@/lib/db";
import { SchoolLib } from "@/types/school";

export const GetSchools = async (page?: number, pageSize?: number) => {
  try {
    // SchoolLib
    const schools: SchoolLib = await db.school
      .findMany({
        where: {
          isPublished: true,
        },
        include: {
          news: true,
          galleries: {
            include: {
              images: true,
            },
          },
          locations: {
            include: {
              contacts: true,
              images: true,
            },
          },
          programs: {
            include: {
              studentPrograms: {
                select: {
                  student: {
                    select: {
                      id: true,
                      studentCode: true,
                      account: {
                        select: {
                          name: true,
                        },
                      },
                      cover: true,
                      degreeType: true,
                      certificateType: true,
                      gradeType: true,
                      gradeScore: true,
                      status: true,
                    },
                  },
                },
              },
            },
          },
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
        },
        orderBy: {
          country: "asc",
        },
        take: pageSize || 10,
        skip: page ? (page - 1) * (pageSize || 10) : 0,
        cacheStrategy: {
          swr: 300,
          ttl: 3600,
        },
      })
      .withAccelerateInfo();
    return schools;
  } catch (error) {
    console.log("GET SCHOOLS DATA ERROR", error);

    return null;
  }
};

export type SchoolCard = {
  id: string;
  name: string;
  logo: string;
  background: string;
  country: string;
  short: string | null;
  isPublished: boolean;
};

export const GetSchoolsCard = async () => {
  try {
    const schools: SchoolCard[] = await db.school.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        background: true,
        country: true,
        short: true,
        isPublished: true,
      },
      orderBy: {
        country: "asc",
      },
      cacheStrategy: {
        swr: 300,
        ttl: 3600,
      },
    });

    return schools;
  } catch (error) {
    console.log("GET SCHOOLS CARD DATA ERROR", error);

    return null;
  }
};

export const GetSchoolInformation = async (schoolId: string) => {
  try {
    const school = await db.school.findUnique({
      where: {
        id: schoolId,
      },
    });

    return school;
  } catch (error) {
    console.log("GET SCHOOL INFORMATION DATA ERROR", error);

    return null;
  }
};
