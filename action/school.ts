"use server";

import {
  SchoolInformationFormValues,
  SchoolInformationSchema,
} from "@/data/form-schema";
import { db } from "@/lib/db";

export const UpdateSchoolInformation = async (
  id: string,
  values: SchoolInformationFormValues
) => {
  try {
    const validatedValues = SchoolInformationSchema.safeParse(values);

    if (!validatedValues.success) {
      console.log(
        "UPDATE_SCHOOL_INFORMATION_ACTION_VALIDATION_ERROR",
        validatedValues.error.errors
      );
      return { error: validatedValues.error.errors };
    }

    const existingSchool = await db.school.findUnique({
      where: {
        id,
      },
    });

    if (!existingSchool) {
      return { error: "Trường học không tồn tại" };
    }

    await db.school.update({
      where: {
        id,
      },
      data: {
        ...validatedValues.data,
      },
    });

    return { success: "Cập nhật thông tin trường học thành công" };
  } catch (error) {
    console.log("UPDATE_SCHOOL_INFORMATION_ACTION_ERROR", error);

    return { error: "Có lỗi xảy ra khi cập nhật thông tin trường học" };
  }
};
