import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.student.findMany({
      select: {
        id: true,
        studentCode: true,
        degreeType: true,
        certificateType: true,
        gradeType: true,
        status: true,
        account: {
          select: {
            name: true,
            email: true,
          },
        },
        school: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.log("ERROR GET ALL STUDENTS", error);
    return NextResponse.json(
      { error: "Lỗi tìm tất cả học sinh" },
      { status: 500 }
    );
  }
}
