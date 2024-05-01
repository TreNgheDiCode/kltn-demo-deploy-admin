import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { newsId: string } }
) {
  try {
    if (!params.newsId)
      return NextResponse.json(
        { error: "Vui lòng cung cấp mã ID của tin tức" },
        { status: 406 }
      );

    const existingNews = await db.news.findUnique({
      where: {
        id: params.newsId,
      },
      include: {
        school: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: "Không tìm thấy tin tức với ID cung cấp" },
        { status: 404 }
      );
    }

    return NextResponse.json(existingNews, { status: 200 });
  } catch (error) {
    console.log("ERROR API GET NEWS BY ID", error);

    return NextResponse.json(
      { error: "Lỗi lấy tin tức theo id" },
      { status: 200 }
    );
  }
}
