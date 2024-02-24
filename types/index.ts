import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.optional(z.string()),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
