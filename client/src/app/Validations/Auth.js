import { z } from "zod";
export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(64, "Username must be less than or equal to 64 characters")
            .trim(),

        name: z
            .string()
            .max(64, "Name must be less than or equal to 64 characters")
            .min(3, "Name is required")
            .trim(),

        email: z
            .string()
            .email("Invalid email format")
            .min(1, "Email is required")
            .trim(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .trim(),

        passwordConfirmation: z
            .string()
            .min(8, "Password confirmation must be at least 8 characters")
            .trim(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    });


export const loginSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(64, "Username must be less than or equal to 64 characters")
            .trim(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .trim(),

    });
