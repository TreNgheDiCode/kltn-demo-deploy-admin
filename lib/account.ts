import { db } from "./db";

export const GetUserByEmail = async (email: string) => {
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
        student: true,
      },
    });

    return user;
  } catch (error) {
    console.log("GET USER ERROR", error);
    return null;
  }
};
