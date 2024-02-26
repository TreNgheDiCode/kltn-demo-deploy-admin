"use server";

import { db } from "@/lib/db";

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

export const updateLogo = async (id: string, url: string) => {
  try {
    await db.school.update({
      where: {
        id,
      },
      data: {
        logoUrl: url,
      },
    });

    return { success: "Cập nhật ảnh thành công" };
  } catch (error) {
    console.log(error);
    return { error: "Cập nhật ảnh thất bại" };
  }
};
