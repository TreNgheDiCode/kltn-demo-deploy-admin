import { db } from "@/lib/db";
import { StudentRequirementReplySchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { studentId: string; requirementId: string } }
) {
  try {
    if (!params.studentId) {
      return NextResponse.json(
        { error: "Không tìm thấy mã học sinh" },
        { status: 400 }
      );
    }

    const existingStudent = await db.student.findUnique({
      where: { id: params.studentId },
      select: { id: true, account: { select: { name: true } } },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    if (!params.requirementId) {
      return NextResponse.json(
        { error: "Không tìm thấy mã yêu cầu" },
        { status: 400 }
      );
    }

    const existingRequirement = await db.studentRequirement.findUnique({
      where: { id: params.requirementId, studentId: params.studentId },
    });

    if (!existingRequirement) {
      return NextResponse.json(
        { error: "Không tìm thấy yêu cầu" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const validatedFields = StudentRequirementReplySchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    const reply = await db.studentRequirementReply.create({
      data: {
        message: data.message,
        senderName: existingStudent.account.name,
        requirementId: params.requirementId,
      },
    });

    if (data.images && data.images.length > 0)
      data.images.forEach(async (image) => {
        await db.studentRequirementReplyImage.create({
          data: {
            url: image,
            replyId: reply.id,
          },
        });
      });

    await db.studentRequirement.update({
      where: { id: params.requirementId },
      data: {
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Phản hồi yêu cầu thành công" });
  } catch (error) {
    console.log("CREATE REQUIREMENT STUDENT ERROR", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Phản hồi yêu cầu không thành công" },
      { status: 500 }
    );
  }
}
