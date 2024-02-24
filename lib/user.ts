import { db } from "./db";

export const GetUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    console.log("GET USER ERROR", error);
    return null;
  }
};
