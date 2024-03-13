import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { GetUserByEmail } from "@/lib/account";
import { LoginSchema } from "@/types";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = LoginSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Trường dữ liệu không hợp lệ" },
        { status: 406 }
      );
    }

    const { email, password } = validatedFields.data;

    const existingUser = await GetUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Không tồn tại người dùng" },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Thông tin tài khoản không chính xác" },
        { status: 403 }
      );
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        existingUser.name,
        process.env.NODE_SENDER_EMAIL!,
        verificationToken.email,
        verificationToken.token
      );

      return NextResponse.json(
        {
          error:
            "Email chưa xác thực, vui lòng kiểm tra hộp thư để được xác thực",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    console.log("ERROR LOGIN:", error);
    return NextResponse.json({ error: "LOGIN ERROR" }, { status: 500 });
  }
}
