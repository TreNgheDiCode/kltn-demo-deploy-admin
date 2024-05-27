import {
  CertificateType,
  Country,
  DegreeType,
  Gender,
  GradeType,
  NewsType,
  PostStatus,
  StudentStatus,
} from "@prisma/client";
import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.optional(z.string()),
});

export const LoginSchema = z.object({
  email: z.optional(
    z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email()
  ),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  studentCode: z.optional(
    z.string().min(10, {
      message: "Student code is required minimum of 10 characters",
    })
  ),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid type of email",
      }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
    name: z.string().min(1, {
      message: "Fullname is required",
    }),
    dob: z
      .date({
        required_error: "Date of birth is required",
      })
      .min(new Date("1970-01-01"), {
        message: "Your age is too old",
      })
      .max(new Date("2006-31-12"), {
        message: "Your age is too young",
      }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      invalid_type_error: "Invalid type, please reselect",
    }),
    phoneNumber: z
      .string({
        invalid_type_error: "Invalid phone number",
        required_error: "Phone number is required",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(13, {
        message: "Maximum 13 numbers is required",
      }),
    idCardNumber: z
      .string({
        required_error: "Id card number is required",
      })
      .min(1, {
        message: "Id card number is required",
      }),
    city: z.string().min(1, {
      message: "City is required",
    }),
    district: z.string().min(1, {
      message: "District is required",
    }),
    ward: z.string().min(1, {
      message: "Ward is required",
    }),
    addressLine: z.string().min(1, {
      message: "Address line is required",
    }),
    schoolName: z
      .string({
        required_error: "School is required",
      })
      .min(1, {
        message: "School is required",
      }),
    programName: z
      .string({
        required_error: "Program is required",
      })
      .min(1, {
        message: "Program is required",
      }),
    degreeType: z.enum([DegreeType.HIGHSCHOOL, DegreeType.UNIVERSITY], {
      required_error: "Degree type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    certificateType: z.enum([CertificateType.IELTS, CertificateType.TOEFL], {
      required_error: "Certificate type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    certificateImg: z
      .string({
        required_error: "Certificate image is required",
      })
      .min(1, {
        message: "Certificate image is required",
      }),
    gradeType: z.enum([GradeType.GPA, GradeType.CGPA], {
      required_error: "Grade type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    gradeScore: z
      .string({
        required_error: "Grade score is required",
      })
      .min(1, {
        message: "Grade score is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.gradeType === GradeType.GPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 4) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }

      if (data.gradeType === GradeType.CGPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 10) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }
    },
    {
      message: "Invalid grade score (maximum is 4 or 10)",
      path: ["gradeScore"],
    }
  );

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      // Minimum length of 8 characters
      .min(8, { message: "Password must be at least 8 characters long" })
      // Maximum length of 25 characters
      .max(25, { message: "Password cannot exceed 25 characters" })
      // Check for at least one digit
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      // Check for at least one lowercase letter
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      // Check for at least one uppercase letter
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      // Check for at least one special character
      .refine((value) => /[^\w\s]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid type of email",
    }),
});

export const PostSchema = z.object({
  status: z.optional(
    z.enum([
      PostStatus.PUBLIC,
      PostStatus.PRIVATE,
      PostStatus.FRIENDS,
      PostStatus.EXCEPT,
    ])
  ),
  content: z.optional(z.string()),
  postImages: z.optional(z.array(z.string())),
});

export const NewSchoolSchema = z.object({
  name: z.string().min(1, {
    message: "Vui lòng nhập tên trường",
  }),
  logo: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện cho trường",
  }),
  short: z.string().min(1, {
    message: "Vui lòng nhập giới thiệu ngắn cho trường",
  }),
  background: z.string().min(1, {
    message: "Vui lòng chọn hình nền cho trường",
  }),
  color: z.string().min(1, {
    message: "Vui lòng nhập mã màu đại diện cho trường",
  }),
  country: z.enum([Country.AUSTRALIA, Country.CANADA, Country.KOREA]),
});

export const UpdateStudent = z.object({
  isLocked: z.optional(z.boolean()),
  status: z.optional(
    z.enum([
      StudentStatus.APPROVED,
      StudentStatus.DROPPED,
      StudentStatus.STUDYING,
      StudentStatus.AWAITING,
    ])
  ),
  email: z.optional(
    z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid type of email",
      })
  ),
  name: z.optional(
    z.string().min(1, {
      message: "Fullname is required",
    })
  ),
  dob: z.optional(
    z
      .date({
        required_error: "Date of birth is required",
      })
      .min(new Date("1970-01-01"), {
        message: "Your age is too old",
      })
      .max(new Date("2006-31-12"), {
        message: "Your age is too young",
      })
  ),
  gender: z.optional(
    z.enum([Gender.MALE, Gender.FEMALE], {
      invalid_type_error: "Invalid type, please reselect",
    })
  ),
  phoneNumber: z.optional(
    z
      .string({
        invalid_type_error: "Invalid phone number",
        required_error: "Phone number is required",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(13, {
        message: "Maximum 13 numbers is required",
      })
  ),
  idCardNumber: z.optional(
    z
      .string({
        required_error: "Id card number is required",
      })
      .min(1, {
        message: "Id card number is required",
      })
  ),
  city: z.optional(
    z.string().min(1, {
      message: "City is required",
    })
  ),
  district: z.optional(
    z.string().min(1, {
      message: "District is required",
    })
  ),
  ward: z.optional(
    z.string().min(1, {
      message: "Ward is required",
    })
  ),
  addressLine: z.optional(
    z.string().min(1, {
      message: "Address line is required",
    })
  ),
  additional: z.optional(z.string()),
});

export const NewsSchema = z.object({
  id: z.optional(z.string()),
  title: z.string().min(1, {
    message: "Vui lòng nhập tiêu đề",
  }),
  content: z.string().min(1, {
    message: "Vui lòng nhập nội dung",
  }),
  type: z.enum([NewsType.ANNOUNCEMENT, NewsType.EVENT, NewsType.BLOG]),
  cover: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện",
  }),
  isPublished: z.boolean(),
  schoolId: z.optional(z.string()),
});
