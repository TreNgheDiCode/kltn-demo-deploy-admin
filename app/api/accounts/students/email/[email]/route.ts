import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>> meomeo");
    if (!params.email) {
      return NextResponse.json(
        { error: "Không tìm thấy email người dùng" },
        { status: 400 }
      );
    }
    const student = await db.account.findUnique({
      where: {
        email: params.email,
      },
      select: {
        dob: true,
        address: true,
        name: true,
        image: true,
        email: true,
        idCardNumber: true,
        gender: true,
        
        student: {
          select: {
            cover:true,
            certificateType: true,
            gradeScore: true,
            status: true,
            degreeType: true,
            school: {
              select: {
                name: true,
                programs: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!student) {
      return NextResponse.json(
        { error: "Không tìm thấy thông tin học sinh" },
        { status: 404 }
      );
    }
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lấy thông tin học sinh không thành công" },
      { status: 500 }
    );
  }
}
