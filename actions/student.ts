"use server";

import { db } from "@/lib/db";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "@/lib/email";
import {
  generatePasswordResetToken,
  generateStudentCode,
  generateVerificationToken,
} from "@/lib/tokens";
import { UpdateStudent } from "@/types";
import { z } from "zod";

export const updateStudent = async (
  id: string,
  values: z.infer<typeof UpdateStudent>
) => {
  try {
    const validatedFields = UpdateStudent.safeParse(values);

    console.log(values);

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

    if (data.email && data.email !== existingStudent.account.email) {
      const existingAccount = await db.account.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingAccount) {
        return { error: "Email đã tồn tại" };
      }

      if (
        data.idCardNumber &&
        data.idCardNumber !== existingStudent.account.idCardNumber
      ) {
        const existIdCard = await db.account.findUnique({
          where: {
            idCardNumber: data.idCardNumber,
          },
        });

        if (existIdCard) {
          return { error: "CCCD/CMND đã tồn tại" };
        }
      }

      const address = `${data.addressLine}, ${data.ward}, ${data.district}, ${data.city}`;

      await db.student.update({
        where: {
          id,
        },
        data: {
          status: "AWAITING",
          account: {
            update: {
              email: data.email,
              name: data.name,
              dob: data.dob,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              idCardNumber: data.idCardNumber,
              address,
            },
          },
        },
      });

      const verificationToken = await generateVerificationToken(data.email);

      await sendVerificationEmail(
        data.name!,
        process.env.NODE_SENDER_EMAIL!,
        verificationToken.email,
        verificationToken.token
      );

      return {
        success:
          "Cập nhật thông tin học sinh thành công, vui lòng xác thực email để mở khóa tính năng!",
      };
    }

    if (data.isLocked) {
      await db.student.update({
        where: {
          id,
        },
        data: {
          account: {
            update: {
              isLocked: true,
            },
          },
        },
      });

      return { success: "Khóa tài khoản học sinh thành công" };
    }

    if (data.isLocked === false) {
      await db.student.update({
        where: {
          id,
        },
        data: {
          account: {
            update: {
              isLocked: false,
            },
          },
        },
      });

      return { success: "Mở khóa tài khoản học sinh thành công" };
    }

    if (data.status === "DROPPED" && !existingStudent.studentCode) {
      await db.student.update({
        where: {
          id: existingStudent.id,
        },
        data: {
          status: data.status,
          additional: data.additional,
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
        include: {
          account: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      const student = await db.student.findUnique({
        where: {
          studentCode,
        },
      });

      if (!student) return;

      await db.profile.create({
        data: {
          studentId: student.id,
        },
      });

      const student = await db.student.findUnique({
        where: {
          studentCode,
        },
      });

      if (!student) {
        return { error: "Không tìm thấy học sinh" };
      }

      await db.profile.create({
        data: {
          studentId: student.id,
        },
      });

      await sendWelcomeEmail(
        updatedStudent.account.name,
        studentCode,
        updatedStudent.account.email
      );

      return { success: "Duyệt học sinh thành công" };
    }

    if (
      data.idCardNumber &&
      data.idCardNumber !== existingStudent.account.idCardNumber
    ) {
      const existIdCard = await db.account.findUnique({
        where: {
          idCardNumber: data.idCardNumber,
        },
      });

      if (existIdCard) {
        return { error: "CCCD/CMND đã tồn tại" };
      }
    }

    const address = `${data.addressLine}, ${data.ward}, ${data.district}, ${data.city}`;

    await db.student.update({
      where: {
        id,
      },
      data: {
        status: data.status,
        additional: data.additional,
        account: {
          update: {
            email: data.email,
            name: data.name,
            dob: data.dob,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            idCardNumber: data.idCardNumber,
            address,
          },
        },
      },
    });

    return { success: "Cập nhật thông tin học sinh thành công" };
  } catch (error) {
    console.log("UPDATE STUDENT ACTION ERROR", error);

    return { error: "Lỗi cập nhật thông tin học sinh" };
  }
};

export const sendPasswordReset = async (email: string, name: string) => {
  try {
    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      name,
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { success: "Gửi yêu cầu khôi phục mật khẩu thành công" };
  } catch (error) {
    console.log("STUDENT RESET PASSWORD ACTION ERROR", error);

    return { error: "Gửi yêu cầu khôi phục mật khẩu thất bại" };
  }
};

export const sendEmailVerfication = async (email: string, name: string) => {
  try {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      name,
      process.env.NODE_SENDER_EMAIL!,
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Gửi yêu cầu xác thực email thành công" };
  } catch (error) {
    console.log("STUDENT VERIFICATION EMAIL ACTION ERROR", error);

    return { error: "Gửi yêu cầu xác thực email thất bại" };
  }
};
