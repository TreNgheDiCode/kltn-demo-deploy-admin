"use server";

import { db } from "@/lib/db";
import { ContactSchema } from "@/types";
import { z } from "zod";

export const createContact = async (values: z.infer<typeof ContactSchema>) => {
  try {
    const validatedFields = ContactSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Trường dữ liệu không hợp lệ" };
    }

    const { ...data } = validatedFields.data;
  } catch (error) {
    console.log("ERROR CREATE CONTACT ACTION", error);

    return { error: "Tạo liên hệ thất bại" };
  }
};
