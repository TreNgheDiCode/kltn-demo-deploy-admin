import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
interface PrivateMessages {
  [key: string]: any; // or a more specific type for your messages
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentCode } = req.query;

  try {
    const chats = await db.chat.findMany({
      where: {
        students: {
          some: {
            studentCode: studentCode as string,
          },
        },
      },
      include: {
        messeges: {
          include: {
            student: {
              include: {
                account: true,
              },
            },
          },
          orderBy: {
            createAt: "asc",
          },
        },
      },
    });

    const privateMessages = chats.reduce<PrivateMessages>((acc, chat) => {
      acc[chat.id] = chat.messeges;
      return acc;
    }, {});

    res.status(200).json(privateMessages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching private messages" });
  }
}
