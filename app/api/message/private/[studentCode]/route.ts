import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface PrivateMessages {
  [key: string]: any; // hoặc một kiểu cụ thể hơn cho messages của bạn
}

export async function GET(
  request: NextRequest,
  { params }: { params: { studentCode: string } }
) {
  try {
    if (!params.studentCode) {
      NextResponse.json(
        { error: "Không tìm thấy sinh viên" },
        {
          status: 404,
        }
      );
    }
    const chats = await db.chat.findMany({
      where: {
        students: {
          some: {
            studentCode: params.studentCode,
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

    return NextResponse.json(privateMessages);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching private messages" },
      { status: 500 }
    );
  }
}
