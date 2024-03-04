import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { uniqueCode: string } }
) {
  try {
    if (!params.uniqueCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 404 }
      );
    }

    const existingStudentCode = await db.user.findUnique({
      where: {
        studentCode: params.uniqueCode,
      },
      select: {
        id: true,
        name: true,
        image: true,
        studentCode: true,
        email: true,
      },
    });

    if (!existingStudentCode) {
      const existingStudentEmail = await db.user.findUnique({
        where: {
          email: params.uniqueCode,
        },
        select: {
          id: true,
          name: true,
          image: true,
          studentCode: true,
          email: true,
        },
      });

      if (!existingStudentEmail) {
        return NextResponse.json(
          { error: "Không tồn tại học sinh" },
          { status: 404 }
        );
      }

      return NextResponse.json(existingStudentEmail, { status: 200 });
    }

    return NextResponse.json(existingStudentCode, { status: 200 });
  } catch (error) {
    console.log("GET STUDENT BY STUDENT CODE ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin người dùng theo mã học sinh" },
      { status: 500 }
    );
  }
}
