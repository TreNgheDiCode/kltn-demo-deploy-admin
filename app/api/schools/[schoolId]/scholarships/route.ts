import { db } from "@/lib/db";
import { CreateScholarshipSchema } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const scholarships = await db.schoolScholarship.findMany({
      where: {
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

    return NextResponse.json(scholarships, { status: 200 });
  } catch (error) {
    console.log("GET SCHOLARSHIPS ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin danh sách học bổng" },
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
        { error: "Không tìm thấy trường học" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const validatedFields = CreateScholarshipSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Thông tin không hợp lệ" },
        { status: 400 }
      );
    }

    const { owners, images, ...data } = validatedFields.data;

    const scholarship = await db.schoolScholarship.create({
      data: {
        schoolId: params.schoolId,
        ...data,
      },
    });

    if (images) {
      await db.schoolScholarshipImage.createMany({
        data: images.map((image) => ({
          url: image,
          scholarshipId: scholarship.id,
        })),
      });
    }

    if (owners) {
      for (let i = 0; i < owners.length; i++) {
        const student = await db.student.findUnique({
          where: {
            id: owners[i],
          },
        });

        if (!student) {
          return NextResponse.json(
            { error: `Không tìm thấy học sinh với mã: ${owners[i]}` },
            { status: 404 }
          );
        }
      }

      await db.studentSchoolScholarship.createMany({
        data: owners.map((owner) => ({
          scholarshipId: scholarship.id,
          studentId: owner,
        })),
      });
    }

    return NextResponse.json(scholarship, { status: 200 });
  } catch (error) {
    console.log("CREATE SCHOLARSHIP ERROR", error);

    return NextResponse.json({ error: "Lỗi tạo học bổng" }, { status: 500 });
  }
}
