import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schools = await db.school.findMany();

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.log("GET SCHOOL ERROR", error);
    return NextResponse.json(
      { error: "Lỗi lấy thông tin trường" },
      { status: 500 }
    );
  }
}
