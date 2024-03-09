import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/lib/tokens";
import { NewPasswordSchema } from "@/types";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const body = await req.json();

    const validatedFields = NewPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Trường dữ liệu không hợp lệ" },
        { status: 406 }
      );
    }

    const { password, confirmPassword } = validatedFields.data;

    if (password && confirmPassword) {
      const passwordMatch = password === confirmPassword;

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Mật khẩu không trùng khớp!" },
          { status: 406 }
        );
      }
    }

    const existingToken = await getPasswordResetTokenByToken(params.token);

    if (!existingToken) {
      return NextResponse.json(
        { error: "Mã khôi phục không tồn tại" },
        { status: 404 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "Mã khôi phục đã hết hạn" },
        { status: 400 }
      );
    }

    const existingUser = await db.account.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.account.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return NextResponse.json(
      { success: "Thay đổi mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.log("NEW PASSWORD ERROR", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi thay đổi mật khẩu" },
      { status: 500 }
    );
  }
}
