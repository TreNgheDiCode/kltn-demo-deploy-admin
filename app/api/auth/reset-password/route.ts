import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = ResetSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Trường dữ liệu không hợp lệ" },
        { status: 406 }
      );
    }

    const { email } = validatedFields.data;

    const existingUser = await db.account.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Không tồn tại người dùng" },
        { status: 401 }
      );
    }

    const passwordResetToken = await generatePasswordResetToken(
      existingUser.email
    );

    await sendPasswordResetEmail(
      existingUser.name,
      passwordResetToken.email,
      passwordResetToken.token
    );

    return NextResponse.json(
      { success: "Gửi email khôi phục mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi gửi email khôi phục mật khẩu" },
      { status: 500 }
    );
  }
}
