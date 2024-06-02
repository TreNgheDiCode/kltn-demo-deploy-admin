"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/types";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    const {
      confirmPassword,
      city,
      district,
      ward,
      addressLine,
      schoolName,
      programName,
      gradeScore,
      email,
      idCardNumber,
      certificateImg,
      certificateType,
      degreeType,
      dob,
      gender,
      gradeType,
      name,
      password,
      phoneNumber,
    } = validatedFields.data;

    const exisitingAccountEmail = await db.account.findUnique({
      where: {
        email,
      },
    });

    const exisitingAccountIdCard = await db.account.findUnique({
      where: {
        idCardNumber,
      },
    });

    if (exisitingAccountEmail) {
      return { error: "Email đã được sử dụng" };
    }

    if (exisitingAccountIdCard) {
      return { error: "CCCD/CMND đã được sử dụng" };
    }

    let hashedPassword = "";

    if (password && confirmPassword) {
      const passwordMatch = password === confirmPassword;

      if (!passwordMatch) {
        return { error: "Mật khẩu không trùng khớp" };
      }

      hashedPassword = await bcrypt.hash(password, 10);
    }

    const address = `${addressLine}, ${ward}, ${district}, ${city}`;

    const existingSchool = await db.school.findUnique({
      where: {
        name: schoolName,
      },
    });

    if (!existingSchool) {
      return { error: "Không tìm thấy trường học" };
    }

    const existingProgram = await db.schoolProgram.findUnique({
      where: {
        schoolId_name: {
          schoolId: existingSchool.id,
          name: programName,
        },
      },
    });

    if (!existingProgram) {
      return { error: "Không tìm thấy ngành đào tạo" };
    }

    const account = await db.account.create({
      data: {
        address,
        email,
        dob,
        gender,
        idCardNumber,
        name,
        password: hashedPassword,
        phoneNumber,
        student: {
          create: {
            certificateImg,
            certificateType,
            degreeType,
            gradeScore: parseFloat(gradeScore),
            gradeType,
            schoolId: existingSchool.id,
            program: {
              create: {
                programId: existingProgram.id,
              },
            },
          },
        },
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
      },
    });

    const verificationToken = await generateVerificationToken(account.email);

    await sendVerificationEmail(
      account.name,
      process.env.NODE_SENDER_EMAIL!,
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Thêm tài khoản thành công, vui lòng xác thực email để tiếp tục",
    };
  } catch (error) {
    console.log("REGISTER ACCOUNT ACTION ERROR", error);
    return { error: "Thêm tài khoản thất bại" };
  }
};
