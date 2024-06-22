import { db } from "@/lib/db";
import { ContactSchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = ContactSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Trường dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { ...data } = validatedFields.data;

    if (data.schoolId) {
      const school = await db.school.findUnique({
        where: {
          id: data.schoolId,
        },
      });

      if (!school) {
        return NextResponse.json(
          { error: "Không tìm thấy trường học" },
          { status: 404 }
        );
      }
    }

    const contact = await db.contact.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.log("ERROR CREATE CONTACT ACTION", error);

    return NextResponse.json(
      { error: "Tạo phản hồi thất bại" },
      { status: 500 }
    );
  }
}
