import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schools = await db.school.findMany({
      include: {
        blogs: {
          include: {
            images: true,
          },
        },
        galleries: {
          include: {
            images: true,
          },
        },
        history: true,
        locations: {
          include: {
            contact: true,
            images: true,
          },
        },
        programs: {
          include: {
            studentPrograms: {
              select: {
                user: {
                  select: {
                    name: true,
                    dob: true,
                    email: true,
                    studentCode: true,
                    gender: true,
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
