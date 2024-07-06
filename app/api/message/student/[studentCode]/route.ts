import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string } }
) {
  try {
    const student = await db.student.findFirst({
      where: {
        studentCode: params.studentCode,
      },
      select: {
        studentCode: true,
        account: {
          select: {
            name: true,
            image: true,
          },
        },
        school: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!student) {
      return NextResponse.json("Không lấy được dữ liệu của student");
    }
    return NextResponse.json(student);
  } catch (e) {
    return NextResponse.json({ e: "Lỗi lấy user" }, { status: 500 });
  }
}
