"use server";

import { db } from "@/lib/db";
import { NewsSchema } from "@/types";
import { z } from "zod";

export const createNews = async (values: z.infer<typeof NewsSchema>) => {
  try {
    const validatedFields = NewsSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    if (values.id) {
      await db.news.upsert({
        where: {
          id: values.id,
        },
        update: {
          ...values,
        },
        create: {
          ...values,
        },
      });
    } else {
      await db.news.create({
        data: {
          ...values,
        },
      });
    }

    return { success: "Cập nhật tin tức thành công" };
  } catch (error) {
    console.log("ERROR CREATE NEWS ACTION", error);

    return { error: "Tạo tin tức thất bại" };
  }
};

export const deleteNews = async (id: string) => {
  try {
    await db.news.delete({
      where: {
        id,
      },
    });

    return { success: "Xóa tin tức thành công" };
  } catch (error) {
    console.log("ERROR DELETE NEWS ACTION", error);

    return { error: "Xóa tin tức thất bại" };
  }
};
