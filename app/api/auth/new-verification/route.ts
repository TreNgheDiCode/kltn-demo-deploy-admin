import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = await req.json();

    console.log(token);

    if (!token) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã xác thực" },
        { status: 400 }
      );
    }

    const existingToken = await db.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    if (!existingToken) {
      return NextResponse.json(
        { error: "Mã xác thực không tồn tại" },
        { status: 404 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "Mã xác thực đã quá hạn" },
        { status: 400 }
      );
    }

    const exitingUser = await db.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!exitingUser) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    await db.user.update({
      where: {
        id: exitingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json({ success: "Xác thực email thành công" });
  } catch (error) {
    console.log("VERIFICATION EMAIL ERROR", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json({ error: "Lỗi xác thực email" }, { status: 500 });
  }
}
