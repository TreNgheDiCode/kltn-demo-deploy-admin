"use server";

import { nameSchema } from "@/types";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export const update = async (values: z.infer<typeof nameSchema>) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "Không tìm thấy người dùng" };
  }

  const validatedFields = nameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Đổi tên thất bại" };
  }

  const data = validatedFields.data;

  try {
    await clerkClient.users.updateUser(userId, data);

    return { success: "Cập nhật tên hiển thị thành công!" };
  } catch (error) {
    console.log(error);
    return { error: "Đổi tên thất bại" };
  }
};
