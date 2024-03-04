import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        studentCode: true,
        email: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("GET ALL STUDENT ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin tất cả học sinh" },
      { status: 500 }
    );
  }
}
