import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const accounts = await db.account.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        student: {
          select: {
            id: true,
            studentCode: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi lấy thông tin tất cả tài khoản" },
      { status: 500 }
    );
  }
}
