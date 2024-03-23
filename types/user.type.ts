import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().min(1, { message: "ID not found, please refresh the page and try again" }),
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(40, { message: "Name must not exceed 40 characters" }),

    bio: z
        .string()
        .trim()
        .min(2, { message: "Bio must be at least 2 characters long" })
        .max(200, { message: "Bio cannot exceed 200 characters" }),

    image: z.string().min(1, { message: "Please upload a profile photo" }),
});
