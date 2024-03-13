import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: {
        isArchived: false,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("ERROR GET ALL POSTS", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin tất cả bài đăng" },
      { status: 500 }
    );
  }
}
