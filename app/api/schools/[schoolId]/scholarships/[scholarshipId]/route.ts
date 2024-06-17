import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string; scholarshipId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã trường học" },
        { status: 400 }
      );
    }

    if (!params.scholarshipId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học bổng" },
        { status: 400 }
      );
    }

    const existingSchool = await db.school.findUnique({
      where: {
        id: params.schoolId,
      },
    });

    if (!existingSchool) {
      return NextResponse.json(
        { error: "Không tìm thấy trường học" },
        { status: 404 }
      );
    }

    const scholarship = await db.schoolScholarship.findUnique({
      where: {
        id: params.scholarshipId,
      },
      include: {
        images: true,
        owners: {
          include: {
            student: true,
          },
        },
        school: true,
      },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Không tìm thấy học bổng" },
        { status: 404 }
      );
    }

    return NextResponse.json(scholarship, { status: 200 });
  } catch (error) {
    console.log("GET SCHOLARSHIP BY ID ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin học bổng" },
      { status: 500 }
    );
  }
}
