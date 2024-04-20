import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import { GetAccountByEmail } from "@/lib/account";
import { LoginSchema } from "@/types";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    const { email, password, studentCode } = validatedFields.data;

    if (email) {
      const existingAccount = await GetAccountByEmail(email);

      if (!existingAccount) {
        return NextResponse.json(
          { error: "Không tồn tại người dùng" },
          { status: 401 }
        );
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingAccount.password
      );

      if (!isPasswordMatch) {
        return NextResponse.json(
          { error: "Thông tin tài khoản không chính xác" },
          { status: 403 }
        );
      }

      if (!existingAccount.emailVerified) {
        const verificationToken = await generateVerificationToken(
          existingAccount.email
        );

        await sendVerificationEmail(
          existingAccount.name,
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

      if (existingAccount.student?.studentCode) {
        return NextResponse.json(
          { error: "Vui lòng sử dụng mã sinh viên để đăng nhập" },
          { status: 401 }
        );
      }

      return NextResponse.json(existingAccount, { status: 200 });
    }

    if (studentCode) {
      const existingStudent = await db.student.findUnique({
        where: {
          studentCode,
        },
        select: {
          account: {
            select: {
              password: true,
            },
          },
          status: true,
        },
      });

      if (!existingStudent) {
        return NextResponse.json(
          { error: "Không tồn tại sinh viên với mã sinh viên này" },
          { status: 401 }
        );
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingStudent.account.password
      );

      if (!isPasswordMatch) {
        return NextResponse.json(
          { error: "Thông tin tài khoản không chính xác" },
          { status: 403 }
        );
      }

      if (existingStudent.status === "AWAITING") {
        return NextResponse.json(
          {
            error:
              "Tài khoản của bạn đang chờ duyệt, vui lòng liên hệ lại hỗ trợ sau 3-4 ngày làm việc nếu chưa có thông tin",
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ success: "Đăng nhập thành công" });
    }
  } catch (error) {
    console.log("ERROR LOGIN:", error);
    return NextResponse.json({ error: "LOGIN ERROR" }, { status: 500 });
  }
}
