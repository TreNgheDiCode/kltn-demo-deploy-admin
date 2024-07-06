import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolName: string } }
) {
  try {
    if (!params.schoolName) {
      NextResponse.json(
        {
          error: "Không tìm thấy trường",
        },
        {
          status: 404,
        }
      );
    }
    const messages = await db.message.findMany({
      where: {
        chat: {
          name: params.schoolName,
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

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching group messages" },
      { status: 500 }
    );
  }
}
