import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return NextResponse.json(
        { error: "Không tìm thấy post ID" },
        { status: 400 }
      );
    }

    const postSave = await db.postSave.findFirst({
      where: {
        postId: params.postId,
      },
    });
    if (postSave) {
      await db.postSave.delete({
        where: {
          id: postSave.id,
        },
      });
    }
    const postLike = await db.postLike.findFirst({
      where: {
        postId: params.postId,
      },
    });
    if (postLike) {
      await db.postLike.delete({
        where: {
          id: postLike.id,
        },
      });
    }

    const post = await db.post.delete({
      where: {
        id: params.postId,
      },
    });
    if (!post) {
      return Response.json({ error: "Lỗi xóa bài viết" }, { status: 404 });
    }

    return NextResponse.json({ success: "Xóa thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi " }, { status: 404 });
  }
}
