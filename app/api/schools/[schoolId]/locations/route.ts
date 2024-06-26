import { db } from "@/lib/db";
import { SchoolLocationSchema } from "@/types";
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

    const locations = await db.schoolLocation.findMany({
      where: {
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.log("GET LOCATIONS ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin danh sách cơ sở" },
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

    const validatedFields = SchoolLocationSchema.safeParse(data);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Thông tin không hợp lệ" },
        { status: 400 }
      );
    }

    const location = await db.schoolLocation.create({
      data: {
        ...data,
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    console.log("CREATE LOCATION ERROR", error);

    return NextResponse.json({ error: "Lỗi tạo cơ sở mới" }, { status: 500 });
  }
}
