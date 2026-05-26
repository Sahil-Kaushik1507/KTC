import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email()
    .min(1, "Username is required"),

  password: z
    .string()
    .min(1, "Password is required"),
  
});