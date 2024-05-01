import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schools = await db.school.findMany({
      where: {
        isPublished: true,
      },
      include: {
        news: {
          include: {
            images: true,
          },
        },
        galleries: {
          include: {
            images: true,
          },
        },
        locations: {
          include: {
            contacts: true,
            images: true,
          },
        },
        programs: {
          include: {
            studentPrograms: {
              select: {
                student: {
                  select: {
                    id: true,
                    studentCode: true,
                    account: {
                      select: {
                        name: true,
                      },
                    },
                    cover: true,
                    degreeType: true,
                    certificateType: true,
                    gradeType: true,
                    gradeScore: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.log("GET SCHOOL FULL ERROR", error);
    return NextResponse.json(
      { error: "Lỗi lấy thông tin trường đầy đủ" },
      { status: 500 }
    );
  }
}
