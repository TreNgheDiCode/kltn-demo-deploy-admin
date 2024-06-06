import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { likeId: string } }
) {
  try {
    if (!params.likeId) {
      return NextResponse.json(
        { error: "Vui lòng truyền id lượt thích vào" },
        { status: 404 }
      );
    }

    const deletedSave = await db.postLike.delete({
      where: {
        id: params.likeId,
      },
    });

    if (deletedSave) {
      return NextResponse.json(
        { success: "Xóa thích thành công" },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { error: "Không tìm thấy lượt thích để xóa" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa thích" }, { status: 500 });
  }
}
