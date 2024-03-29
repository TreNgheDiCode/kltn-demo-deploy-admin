"use server";

import { db } from "@/lib/db";
import { NewSchoolSchema } from "@/types";
import { z } from "zod";

export const UpdateName = async (id: string, name: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return { success: "Cập nhật tên trường thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL NAME", error);
    return { error: "Lỗi cập nhật tên trường" };
  }
};

export const UpdateShort = async (id: string, short: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        short,
      },
    });

    return { success: "Cập nhật giới thiệu ngắn thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL SHORT", error);
    return { error: "Lỗi cập nhật giới thiệu ngắn trường" };
  }
};

export const UpdateColor = async (id: string, color: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        color,
      },
    });

    return { success: "Cập nhật mã màu thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL SHORT", error);
    return { error: "Lỗi cập nhật mã màu trường" };
  }
};

export const updateLogo = async (id: string, logo: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        logo,
      },
    });

    return { success: "Cập nhật ảnh thành công" };
  } catch (error) {
    console.log(error);
    return { error: "Cập nhật ảnh thất bại" };
  }
};

export const updateBackground = async (id: string, background: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        background,
      },
    });

    return { success: "Cập nhật hình nền thành công" };
  } catch (error) {
    console.log(error);
    return { error: "Cập nhật hình nền thất bại" };
  }
};

export const updateStatus = async (id: string, value: boolean) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        isPublished: value,
      },
    });

    return { success: "Cập nhật trạng thái trường thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL STATUS", error);
    return { error: "Lỗi cập nhật trạng thái của trường" };
  }
};

export const updateDescription = async (id: string, description: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });

    return { success: "Cập nhật giới thiệu trường thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL DESCRIPTION", error);
    return { error: "Lỗi cập nhật giới thiệu trường" };
  }
};

export const updateHistory = async (id: string, history: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        history,
      },
    });

    return { success: "Cập nhật lịch sử trường thành công" };
  } catch (error) {
    console.log("UPDATE SCHOOL DESCRIPTION", error);
    return { error: "Lỗi cập nhật lịch sử trường" };
  }
};

export const createSchool = async (values: z.infer<typeof NewSchoolSchema>) => {
  try {
    const validatedFields = NewSchoolSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Thông tin truyền vào không hợp lệ" };
    }

    const data = validatedFields.data;

    const existingSchool = await db.school.findFirst({
      where: {
        name: values.name,
      },
    });

    if (existingSchool) {
      return { error: "Đã tồn tại trường với tên này" };
    }

    await db.school.create({
      data: {
        ...data,
      },
    });

    return { success: "Thêm trường học thành công" };
  } catch (error) {
    console.log("CREATE SCHOOL ERROR", error);

    return { error: "Lỗi thêm trường học mới" };
  }
};
