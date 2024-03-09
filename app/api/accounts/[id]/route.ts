import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã người dùng" },
        { status: 404 }
      );
    }

    const existingAccount = await db.account.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        isTwoFactorEnabled: true,
        student: {
          select: {
            studentCode: true,
            status: true,
          },
        },
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { error: "Không tồn tại người dùng" },
        { status: 404 }
      );
    }

    return NextResponse.json(existingAccount, { status: 200 });
  } catch (error) {
    console.log("GET STUDENT BY STUDENT CODE ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin người dùng theo mã học sinh" },
      { status: 500 }
    );
  }
}
