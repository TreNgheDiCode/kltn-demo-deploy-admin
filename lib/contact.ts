import { db } from "./db";

export const GetContactLib = async () => {
  const contacts = await db.contact.findMany({
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

  return contacts;
};
