import { Country } from "@prisma/client";
import * as z from "zod";

export const SchoolInformationSchema = z.object({
  logo: z.string({
    required_error: "Logo không được để trống",
  }),
  background: z.string({
    required_error: "Màu nền không được để trống",
  }),
  name: z.string().min(3, {
    message: "Tên trường học phải có ít nhất 3 ký tự",
  }),
  short: z.optional(z.string()),
  color: z.string({
    required_error: "Màu trường không được để trống",
  }),
  isPublished: z.boolean(),
  country: z.enum([Country.AUSTRALIA, Country.CANADA, Country.KOREA]),
});
export type SchoolInformationFormValues = z.infer<
  typeof SchoolInformationSchema
>;
