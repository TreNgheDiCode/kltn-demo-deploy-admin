import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string; programId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã trường học" },
        { status: 400 }
      );
    }

    if (!params.programId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã ngành đào tạo" },
        { status: 400 }
      );
    }

    const program = await db.schoolProgram.findUnique({
      where: {
        schoolId: params.schoolId,
        id: params.programId,
        isPublished: true,
      },
    });

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.log("GET PROGRAM BY ID ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin ngành đào tạo" },
      { status: 500 }
    );
  }
}
