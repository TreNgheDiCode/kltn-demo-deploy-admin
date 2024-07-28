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

export const SchoolLocationContactSchema = z.object({
  phone: z.optional(z.string()),
  hours: z.optional(z.string()),
  fax: z.optional(z.string()),
  email: z.optional(z.string()),
  url: z.optional(z.string()),
});

export const SchoolLocationSchema = z.object({
  cover: z
    .string({
      required_error: "Ảnh bìa không được để trống",
    })
    .min(3, {
      message: "Ảnh bìa không được để trống",
    }),
  name: z.string().min(3, {
    message: "Tên cơ sở phải có ít nhất 3 ký tự",
  }),
  address: z.string().min(3, {
    message: "Địa chỉ phải có ít nhất 3 ký tự",
  }),
  isMain: z.boolean(),
  images: z.optional(z.array(z.string())),
  contacts: z.optional(z.array(SchoolLocationContactSchema)),
});

export const SchoolProgramSchema = z.object({
  name: z.string().min(3, {
    message: "Tên ngành đào tạo phải có ít nhất 3 ký tự",
  }),
  description: z.string().min(3, {
    message: "Mô tả ngành đào tạo phải có ít nhất 3 ký tự",
  }),
  cover: z.string({
    required_error: "Ảnh bìa không được để trống",
  }),
  images: z.optional(z.array(z.string())),
});

export const SchoolGallerySchema = z.object({
  name: z.string().min(3, {
    message: "Tên bộ sưu tập phải có ít nhất 3 ký tự",
  }),
  description: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
});

export const SchoolScholarshipSchema = z.object({
  name: z.string().min(3, {
    message: "Tên học bổng phải có ít nhất 3 ký tự",
  }),
  description: z.string().min(3, {
    message: "Mô tả học bổng phải có ít nhất 3 ký tự",
  }),
  cover: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
});

// Create School Form
export const CreateSchoolSchema = z.object({
  logo: z.string({
    required_error: "Ảnh đại diện không được để trống",
  }),
  background: z.string({
    required_error: "Ảnh bìa không được để trống",
  }),
  name: z
    .string({
      required_error: "Tên trường học không được để trống",
    })
    .min(3, {
      message: "Tên trường học phải có ít nhất 3 ký tự",
    }),
  short: z.optional(z.string()),
  color: z.string({
    required_error: "Màu trường không được để trống",
  }),
  country: z.enum([Country.AUSTRALIA, Country.CANADA, Country.KOREA], {
    required_error: "Quốc gia không được để trống",
    invalid_type_error: "Quốc gia không hợp lệ",
  }),
  locations: z.array(SchoolLocationSchema).min(1, {
    message: "Phải có ít nhất một cơ sở",
  }),
  programs: z.array(SchoolProgramSchema).min(1, {
    message: "Phải có ít nhất một ngành đào tạo",
  }),
  galleries: z.optional(z.array(SchoolGallerySchema)),
  scholarships: z.optional(z.array(SchoolScholarshipSchema)),
});

export type CreateSchoolFormValues = z.infer<typeof CreateSchoolSchema>;
