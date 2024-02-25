import { db } from "@/lib/db";
import { GetSchoolsById } from "@/lib/schools";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp mã ID của trường" },
        { status: 406 }
      );
    }

    const existingSchool = await GetSchoolsById(params.schoolId);

    if (!existingSchool) {
      return NextResponse.json(
        { error: "Không tìm thấy trường với ID cung cấp" },
        { status: 404 }
      );
    }

    const school = await db.school.findUnique({
      where: {
        id: params.schoolId,
      },
    });

    return NextResponse.json(school, { status: 200 });
  } catch (error) {
    console.log("GET SCHOOL ID ERROR", error);
    return NextResponse.json(
      { error: "Lỗi lấy thông tin trường theo ID" },
      { status: 500 }
    );
  }
}
