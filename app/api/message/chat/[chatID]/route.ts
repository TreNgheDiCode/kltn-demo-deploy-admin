import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { chatID: string } }
) {
  try {
    if (!params.chatID) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã hội thoại" },
        { status: 404 }
      );
    }
    const chat = await db.chat.findUnique({
      where: {
        name: params.chatID,
      },
      include: {
        messeges: {
          select: {
            id: true,
            content: true,
            createAt: true,
            student: {
              select: {
                studentCode: true,
                account: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return NextResponse.json(
        { error: "Không tìm thấy cuộc hội thoại" },
        { status: 404 }
      );
    }

    // Chuyển đổi dữ liệu để phù hợp với cấu trúc Message trong frontend
    const messages = chat.messeges.map((msg) => ({
      id: msg.id,
      text: msg.content,
      sender: msg.student.studentCode,
      senderName: msg.student.account.name,
      avatar: msg.student.account.image,
      createdAt: msg.createAt,
    }));

    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
