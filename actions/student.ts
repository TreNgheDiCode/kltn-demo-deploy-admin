"use server";

import { db } from "@/lib/db";
import { sendVerificationEmail, sendWelcomeEmail } from "@/lib/email";
import { generateStudentCode, generateVerificationToken } from "@/lib/tokens";
import { UpdateStudent } from "@/types";
import { z } from "zod";

export const updateStudent = async (
  id: string,
  values: z.infer<typeof UpdateStudent>
) => {
  try {
    const validatedFields = UpdateStudent.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    const data = validatedFields.data;

    const existingStudent = await db.student.findUnique({
      where: {
        id,
      },
      include: {
        account: true,
      },
    });

    if (!existingStudent) {
      return { error: "Không tìm thấy học sinh" };
    }

    if (data.status === "DROPPED" && !existingStudent.studentCode) {
      await db.student.update({
        where: {
          id: existingStudent.id,
        },
        data: {
          ...data,
        },
      });

      return { success: "Từ chối học sinh thành công" };
    }

    if (!existingStudent.account.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingStudent.account.email
      );

      await sendVerificationEmail(
        existingStudent.account.name,
        process.env.NODE_SENDER_EMAIL!,
        verificationToken.email,
        verificationToken.token
      );

      return {
        error:
          "Tài khoản chưa xác thực email, vui lòng kiểm tra hộp thư để tiến hành xác thực",
      };
    }

    if (
      !existingStudent.studentCode &&
      existingStudent.status === "AWAITING" &&
      data.status === "APPROVED" &&
      data.status
    ) {
      const studentCode = generateStudentCode(existingStudent.degreeType);

      const updatedStudent = await db.student.update({
        where: {
          id: existingStudent.id,
        },
        data: {
          studentCode,
          status: "APPROVED",
        },
        select: {
          account: {
            select: {
              email: true,
              name: true,
            },
          },
          studentCode: true,
          status: true,
        },
      });

      await sendWelcomeEmail(
        updatedStudent.account.name,
        studentCode,
        updatedStudent.account.email
      );

      return { success: "Duyệt học sinh thành công" };
    }

    await db.student.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return { success: "Cập nhật thông tin học sinh thành công" };
  } catch (error) {
    console.log("UPDATE STUDENT ACTION ERROR", error);

    return { error: "Lỗi cập nhật thông tin học sinh" };
  }
};
