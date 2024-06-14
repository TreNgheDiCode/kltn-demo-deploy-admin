import { db } from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { phoneNumber }: { phoneNumber: string } = await req.json();
    const updatePhone = await db.account.update({
      where: {
        id: params.id,
      },
      data: {
        phoneNumber: phoneNumber,
      },
    });
    if (!updatePhone) {
      return NextResponse.json(
        { error: "Lỗi cập nhật số điện thoại" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: "update phoneNumber thành công " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Lỗi" }, { status: 404 });
  }
}
