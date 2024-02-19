import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.optional(z.string()),
});
