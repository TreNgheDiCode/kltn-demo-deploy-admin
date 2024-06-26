import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolName: string } }
) {
  try {
    const student = await db.student.findMany({
      where: {
        school: {
          name: params.schoolName,
        },
      },
      select: {
        studentCode: true,
        profile: {
          select: {
            status: true,
          },
        },
        account: {
          select: {
            image: true,
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
