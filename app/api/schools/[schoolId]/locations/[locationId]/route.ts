import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string; locationId: string } }
) {
  try {
    if (!params.schoolId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã trường học" },
        { status: 400 }
      );
    }

    if (!params.locationId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã cơ sở" },
        { status: 400 }
      );
    }

    const location = await db.schoolLocation.findUnique({
      where: {
        schoolId: params.schoolId,
        id: params.locationId,
      },
    });

    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    console.log("GET LOCATION BY ID ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin cơ sở" },
      { status: 500 }
    );
  }
}
