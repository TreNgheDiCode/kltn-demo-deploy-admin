import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const schools = await db.school.findMany({
      where: {
        isPublished: true,
      },
      include: {
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
        galleries: {
          include: {
            images: true,
          },
        },
        scholarships: {
          include: {
            images: true,
            owners: {
              include: {
                student: true,
              },
            },
          },
        },
        news: true,
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
