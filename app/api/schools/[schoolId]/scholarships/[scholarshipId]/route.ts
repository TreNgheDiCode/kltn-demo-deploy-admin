import { db } from "@/lib/db";
import { RegisScholarshipSchema } from "@/types";
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

export async function POST(
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
        isPublished: true,
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

    const body = await req.json();

    const validatedFields = RegisScholarshipSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    const existingOwner = await db.student.findUnique({
      where: {
        id: data.studentId,
      },
    });

    if (!existingOwner) {
      return NextResponse.json(
        { error: "Không tìm thấy tài khoản học sinh" },
        { status: 404 }
      );
    }

    const existingRegis = await db.studentSchoolScholarship.findFirst({
      where: {
        scholarshipId: scholarship.id,
        studentId: data.studentId,
      },
    });

    if (existingRegis && existingRegis.status === "APPROVED") {
      return NextResponse.json(
        { error: "Học sinh đã sở hữu học bổng này" },
        { status: 400 }
      );
    }

    if (existingRegis && existingRegis.status === "PENDING") {
      return NextResponse.json(
        {
          error:
            "Học sinh đã đăng ký học bổng này. Vui lòng chờ phản hồi từ trường học",
        },
        { status: 400 }
      );
    }

    if (existingRegis && existingRegis.status === "REJECTED") {
      await db.studentSchoolScholarship.update({
        where: {
          id: existingRegis.id,
        },
        data: {
          status: "PENDING",
          description: data.additional,
        },
      });

      await db.student.update({
        where: {
          id: existingOwner.id,
        },
        data: {
          additional: "Chờ phản hồi đăng ký học bổng từ trường học",
        },
      });

      return NextResponse.json(
        { success: "Đăng ký học bổng thành cộng" },
        { status: 200 }
      );
    }

    await db.studentSchoolScholarship.create({
      data: {
        studentId: existingOwner.id,
        scholarshipId: scholarship.id,
        status: "PENDING",
        description: data.additional,
      },
    });

    await db.student.update({
      where: {
        id: existingOwner.id,
      },
      data: {
        additional: "Chờ phản hồi đăng ký học bổng từ trường học",
      },
    });

    return NextResponse.json(
      { success: "Đăng ký học bổng thành cộng" },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET SCHOLARSHIP BY ID ERROR", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi đăng ký học bổng" },
      { status: 500 }
    );
  }
}
