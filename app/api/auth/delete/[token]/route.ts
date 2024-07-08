import { db } from "@/lib/db";
import {
  getDeleteAccountTokenByToken,
  getPasswordResetTokenByToken,
} from "@/lib/tokens";
import { DeleteSchema } from "@/types";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const existingToken = await getDeleteAccountTokenByToken(params.token);

    if (!existingToken) {
      return NextResponse.json(
        { error: "Mã yêu cầu xóa tài khoản không tồn tại" },
        { status: 404 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "Mã yêu cầu đã hết hạn" },
        { status: 400 }
      );
    }

    const existingAccount = await db.account.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    await db.deleteAccountToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    await db.account.delete({
      where: {
        id: existingAccount.id,
      },
    });

    return NextResponse.json(
      { success: "Xóa tài khoản thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR", error);

    return NextResponse.json(
      { error: "Lỗi xóa tài khoản người dùng" },
      { status: 500 }
    );
  }
}
