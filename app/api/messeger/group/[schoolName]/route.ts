import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { schoolName } = req.query;

  try {
    const messages = await db.message.findMany({
      where: {
        chat: {
          name: schoolName as string,
        },
      },
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
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching group messages" });
  }
}
