import { db } from "@/lib/db";
import { sendVerificationEmail, sendWelcomeEmail } from "@/lib/email";
import { generateStudentCode, generateVerificationToken } from "@/lib/tokens";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã tài khoản" },
        { status: 404 }
      );
    }

    const existingAccount = await db.account.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        isTwoFactorEnabled: true,
        student: {
          select: {
            studentCode: true,
            status: true,
            profile: true
          },
        },
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { error: "Không tồn tại tài khoản" },
        { status: 404 }
      );
    }

    return NextResponse.json(existingAccount, { status: 200 });
  } catch (error) {
    console.log("GET ACCOUNT BY ID ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin tài khoản theo mã tài khoản" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã tài khoản" },
        { status: 404 }
      );
    }

    const existingAccount = await db.account.findUnique({
      where: {
        id: params.id,
      },
      include: {
        student: {
          select: {
            studentCode: true,
            status: true,
            degreeType: true,
          },
        },
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { error: "Không tồn tại tài khoản" },
        { status: 404 }
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
            "Tài khoản chưa xác thực email, vui lòng kiểm tra hộp thư để được xác thực, sau đó thử lại",
        },
        { status: 403 }
      );
    }

    if (!existingAccount.student) {
      return NextResponse.json(
        { error: "Tài khoản sinh viên không tồn tại" },
        { status: 403 }
      );
    }

    if (
      existingAccount.student.status === "AWAITING" &&
      !existingAccount.student.studentCode
    ) {
      const studentCode = generateStudentCode(
        existingAccount.student.degreeType
      );

      const updatedStudent = await db.student.update({
        where: {
          accountId: params.id,
        },
        data: {
          studentCode,
          status: "APPROVED",
        },
        select: {
          account: {
            select: {
              name: true,
            },
          },
          studentCode: true,
          status: true,
        },
      });

      await sendWelcomeEmail(
        existingAccount.name,
        studentCode,
        existingAccount.email
      );

      return NextResponse.json(updatedStudent, { status: 200 });
    }

    return NextResponse.json(existingAccount, { status: 200 });
  } catch (error) {
    console.log("ACCOUNT ACCEPTED ERROR", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Duyệt hồ sơ thất bại" },
      { status: 500 }
    );
  }
}
