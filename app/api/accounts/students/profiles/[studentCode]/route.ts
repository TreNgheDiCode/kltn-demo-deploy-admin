import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string } }
) {
  try {
    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 404 }
      );
    }

    const student = await db.student.findUnique({
      where: {
        studentCode: params.studentCode,
      },
      include: {
        account: {
          select: {
            dob: true,
            address: true,
            name: true,
            image: true,
          },
        },
        school: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        studentId: student.id,
      },
      include: {},
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Không tồn tại hồ sơ" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.log("GET PROFILE BY STUDENT CODE ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin hồ sơ theo mã học sinh" },
      { status: 500 }
    );
  }
}
