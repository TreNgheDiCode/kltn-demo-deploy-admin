import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const profile = await db.profile.findFirst({
      where: {
        id: params.profileId,
      },
      select: {
        id: true,
        biography: {
          select: {
            id: true,
            content: true,
          },
        },
        student: {
          select: {
            account: {
              select: {
                id: true,
                image: true,
                address: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });
    if (!profile) {
      return NextResponse.json(
        { error: "Không tìm thấy profile trong database" },
        { status: 500 }
      );
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    NextResponse.json(
      { error: "Không lấy được thông tin profile" },
      { status: 500 }
    );
  }
}
