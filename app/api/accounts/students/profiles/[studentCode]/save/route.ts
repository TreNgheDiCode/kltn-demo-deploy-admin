import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { studentCode: string } }
) {
  try {
    if (!params.studentCode) {
      return NextResponse.json(
        { error: "vui lòng truyền vào mã sinh viên " },
        { status: 404 }
      );
    }
    const saves = await db.postSave.findMany({
      where: {
        profile: {
          student: {
            studentCode: params.studentCode,
          },
        },
      },
      select: {
        id: true,
        profile: {
          select: {
            id: true,
            student: {
              select: {
                account: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        post: {
          include: {
            images: true,
          },
        },
      },
    });

    if (saves.length === 0) {
      return NextResponse.json(
        {
          error: "Không tìm thấy mã danh sách hoặc không có bài viết nào lưu",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(saves);
  } catch (error) {
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tìm ID sinh viên" },
      { status: 500 }
    );
  }
}
