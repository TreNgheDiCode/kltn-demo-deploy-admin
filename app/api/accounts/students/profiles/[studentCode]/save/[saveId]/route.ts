import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { saveId: string } }
) {
  try {
    if (!params.saveId) {
      return NextResponse.json(
        { error: "Vui lòng truyền id vào" },
        { status: 404 }
      );
    }

    const deletedSave = await db.postSave.delete({
      where: {
        id: params.saveId,
      },
    });

    if (deletedSave) {
      return NextResponse.json(
        { success: "Xóa lưu thành công" },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { error: "Không tìm thấy lượt lưu để xóa" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa lưu" }, { status: 500 });
  }
}
