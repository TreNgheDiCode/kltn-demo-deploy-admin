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

    const user = await db.user.findUnique({
      where: {
        studentCode: params.studentCode,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            dob: true,
            address: true,
            studentCode: true,
            name: true,
            image: true,
            school: {
              select: {
                name: true,
                logoUrl: true,
              },
            },
          },
        },
      },
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
