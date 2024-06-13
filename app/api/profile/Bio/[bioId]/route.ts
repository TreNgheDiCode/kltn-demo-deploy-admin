import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { bioId: string } }
) {
  try {
    const { content }: { content: string } = await req.json();
    const updateBio = await db.profileBiography.update({
      where: {
        id: params.bioId,
      },
      data: {
        content: content,
      },
    });
    if (!updateBio) {
      return NextResponse.json(
        { error: "cập nhật bio thất bại" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: "Cập nhật bio thành công" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi cập nhật bio" },
      { status: 500 }
    );
  }
}
