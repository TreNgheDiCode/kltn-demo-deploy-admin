import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string; postId: string } }
) {
  try {
    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 400 }
      );
    }

    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 404 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        studentCode: params.studentCode,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Hồ sơ không tồn tại" },
        { status: 404 }
      );
    }

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
    });

    if (!post) {
      return NextResponse.json(
        { error: "Bài đăng không tồn tại" },
        { status: 404 }
      );
    }

    const comments = await db.postComment.findMany({
      where: {
        profileId: profile.id,
        postId: post.id,
      },
      include: {
        image: true,
        children: {
          select: {
            id: true,
          },
        },
        likes: true,
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log("ERROR GET POST BY POST & PROFILE ID", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin bình luận bài đăng" },
      { status: 500 }
    );
  }
}
