"use server";

import { db } from "@/lib/db";
import { FeedbackSchema } from "@/types";
import { z } from "zod";

export const createFeedback = async (
  values: z.infer<typeof FeedbackSchema>
) => {
  try {
    const validatedFields = FeedbackSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    const { ...data } = validatedFields.data;
  } catch (error) {
    console.log("ERROR CREATE CONTACT ACTION", error);

    return { error: "Tạo liên hệ thất bại" };
  }
};
