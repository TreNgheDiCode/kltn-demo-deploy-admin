import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const news = await db.news.findMany({
      where: {
        isPublished: true,
      },
      include: {
        school: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.log("ERROR API GET NEWS", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin tin tức" },
      { status: 500 }
    );
  }
}
