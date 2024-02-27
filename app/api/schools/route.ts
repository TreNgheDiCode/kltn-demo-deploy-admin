import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schools = await db.school.findMany({
      where: {
        isPublished: true,
      },
      include: {
        programs: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.log("GET SCHOOL ERROR", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi lấy thông tin trường" },
      { status: 500 }
    );
  }
}
