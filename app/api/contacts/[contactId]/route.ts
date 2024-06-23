import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    if (!params.contactId) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã phản hồi" },
        { status: 404 }
      );
    }

    const contact = await db.contact.findUnique({
      where: {
        id: params.contactId,
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            logo: true,
            country: true,
          },
        },
      },
    });

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.log("ERROR GET CONTACT ACTION", error);

    return NextResponse.json(
      { error: "Lấy dữ liệu phản hồi thất bại" },
      { status: 500 }
    );
  }
}
