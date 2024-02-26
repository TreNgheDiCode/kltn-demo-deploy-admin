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
      ...value
    } = validatedFields.data;

    const exisitingUser = await db.user.findUnique({
      where: {
        email,
        idCardNumber,
      },
    });

    if (exisitingUser) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 403 }
      );
    }

    if (value.password && confirmPassword) {
      const passwordMatch = value.password === confirmPassword;

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Mật khẩu không trùng khớp!" },
          { status: 406 }
        );
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      value.password = hashedPassword;
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

    const existingProgram = await db.program.findUnique({
      where: {
        schoolId_name: {
          schoolId: existingSchool.id,
          name: programName,
        },
      },
    });

    if (!existingProgram) {
      return NextResponse.json(
        { error: "Không tìm thấy chương trình đào tạo!" },
        { status: 404 }
      );
    }

    const studentCode = generateStudentCode(value.degreeType);

    const profile = await db.profile.create({
      data: {
        user: {
          create: {
            email,
            idCardNumber,
            studentCode: studentCode,
            address,
            gradeScore: parseFloat(gradeScore),
            schoolId: existingSchool.id,
            program: {
              create: {
                programId: existingProgram.id,
              },
            },
            ...value,
          },
        },
      },
      select: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const verificationToken = await generateVerificationToken(
      profile.user.email
    );

    await sendVerificationEmail(
      profile.user.name,
      process.env.NODE_SENDER_EMAIL!,
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      {
        profile,
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
