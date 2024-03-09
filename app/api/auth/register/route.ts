import { db } from "@/lib/db";
import { RegisterSchema } from "@/types";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateStudentCode, generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    body.dob = new Date(body.dob);

    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.issues },
        { status: 406 }
      );
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
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 403 }
      );
    }

    if (exisitingAccountIdCard) {
      return NextResponse.json(
        { error: "Căn cước công dân đã được sử dụng" },
        { status: 403 }
      );
    }

    let hashedPassword = "";

    if (password && confirmPassword) {
      const passwordMatch = password === confirmPassword;

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Mật khẩu không trùng khớp!" },
          { status: 406 }
        );
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
      return NextResponse.json(
        { error: "Không tìm thấy trường học!" },
        { status: 404 }
      );
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
      return NextResponse.json(
        { error: "Không tìm thấy ngành đào tạo!" },
        { status: 404 }
      );
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

    return NextResponse.json(
      {
        account,
        message:
          "Đăng ký thành công, vui lòng check hòm thư email để xác thực người dùng",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("REGISTER ERROR", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Căn cước công dân đã được sử dụng" },
          { status: 400 }
        );
      }
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json({ error: "Đăng ký thất bại" }, { status: 500 });
  }
}
