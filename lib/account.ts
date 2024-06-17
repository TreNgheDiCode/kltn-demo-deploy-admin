import { db } from "./db";

export const GetAccountLib = async () => {
  const accounts = await db.account.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      dob: true,
      emailVerified: true,
      phoneNumber: true,
      address: true,
      idCardNumber: true,
      isTwoFactorEnabled: true,
      student: {
        select: {
          id: true,
          studentCode: true,
          status: true,
        },
      },
      isLocked: true,
    },
  });

  return accounts;
};

export const GetAccountByEmail = async (email: string) => {
  try {
    const user = await db.account.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        name: true,
        dob: true,
        phoneNumber: true,
        student: {
          select: {
            scholarship: {
              include: {
                scholarship: true,
              },
            },
            status: true,
            school: {
              select: {
                name: true,
                logo: true,
                background: true,
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
          },
        },
        isLocked: true,
      },
    });

    return user;
  } catch (error) {
    console.log("GET USER ERROR", error);
    return null;
  }
};
