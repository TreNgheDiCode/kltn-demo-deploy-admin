import { db } from "@/lib/db";
import { DeleteSchema } from "@/types";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateDeleteAccountToken } from "@/lib/tokens";
import { sendDeleteAccountEmail } from "@/lib/email";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = DeleteSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    const existingAccount = await db.account.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        { error: "Tài khoản không tồn tại!" },
        { status: 400 }
      );
    }

    if (data.password) {
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        existingAccount.password
      );

      if (!isPasswordMatch) {
        return NextResponse.json(
          { error: "Thông tin tài khoản không chính xác" },
          { status: 403 }
        );
      }

      const deleteAccountToken = await generateDeleteAccountToken(
        existingAccount.email
      );

      await sendDeleteAccountEmail(
        existingAccount.name,
        existingAccount.email,
        deleteAccountToken.token
      );

      return NextResponse.json(
        { success: "Gửi email xác nhận xóa tài khoản thành công" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Tìm thấy tài khoản" },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE ACCOUNT ERROR: ", error);

    return NextResponse.json(
      { error: "Có lỗi xảy ra, vui lòng thử lại sau!" },
      { status: 500 }
    );
  }
}
