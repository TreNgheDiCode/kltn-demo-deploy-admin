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

    return { success: "Cập nhật tin tức thành công" };
  } catch (error) {
    console.log("ERROR CREATE NEWS ACTION", error);

    return { error: "Tạo tin tức thất bại" };
  }
};
