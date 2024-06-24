import { db } from "@/lib/db";
import { SchoolProgramSchema } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã trường học" },
        { status: 400 }
      );
    }

    const programs = await db.schoolProgram.findMany({
      where: {
        schoolId: params.schoolId,
        isPublished: true,
      },
    });

    return NextResponse.json(programs, { status: 200 });
  } catch (error) {
    console.log("GET LOCATIONS ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin danh sách ngành đào tạo" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã trường học" },
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
        { error: "Trường học không tồn tại" },
        { status: 404 }
      );
    }

    const data = await req.json();

    const validatedFields = SchoolProgramSchema.safeParse(data);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error },
        { status: 400 }
      );
    }

    const program = await db.schoolProgram.create({
      data: {
        ...data,
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.log("CREATE PROGRAM ERROR", error);

    return NextResponse.json(
      { error: "Lỗi tạo mới ngành đào tạo" },
      { status: 500 }
    );
  }
}
