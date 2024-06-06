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
      return NextResponse.json({ error: "Không tìm thấy trang cá nhân" });
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

    const save = await db.postSave.findUnique({
      where: {
        profileId_postId: {
          profileId: profile.id,
          postId: post.id,
        },
      },
    });

    if (save) {
      await db.postSave.delete({
        where: {
          id: save.id,
        },
      });
      return NextResponse.json({ success: "Bỏ lưu thành công" });
    }

    await db.postSave.create({
      data: {
        postId: post.id,
        profileId: profile.id,
      },
    });
    return NextResponse.json({ success: "Lưu bài viết thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Lưu bài viết thất bại" });
  }
}


