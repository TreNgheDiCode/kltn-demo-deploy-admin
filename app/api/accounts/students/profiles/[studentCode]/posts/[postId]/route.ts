import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã bài đăng" },
        { status: 400 }
      );
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        comments: {
          include: {
            likes: true,
            children: true,
          },
        },
        images: true,
        likes: true,
        saves: true,
        shares: true,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("ERROR GET POST ID FULL", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin đầy đủ bài đăng" },
      { status: 500 }
    );
  }
}

