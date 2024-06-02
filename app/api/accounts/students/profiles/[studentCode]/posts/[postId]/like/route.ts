import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string; postId: string } }
) {
  try {
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode: params.studentCode,
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Không tìm thấy hồ sơ" });
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
        isArchived: false,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "không tìm thấy bài viết" });
    }

    const like = await db.postLike.findUnique({
      where: {
        profileId_postId: {
          postId: post.id,
          profileId: profile.id,
        },
      },
    });

    if (like) {
      await db.postLike.delete({
        where: {
          id: like.id,
        },
      });

      return NextResponse.json({ success: "Hủy thích thành công" });
    }

    await db.postLike.create({
      data: {
        postId: post.id,
        profileId: profile.id,
      },
    });

    return NextResponse.json({ success: "Thích bài viết thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Thích thất bại" });
  }
}
