import { z } from "zod";

export const PostSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(50, { message: "Title must not exceed 50 characters" }),
    content: z
        .string()
        .trim()
        .min(24, { message: "Post content must be at least 24 characters" })
        .max(6240, { message: "Post content cannot exceed 6240 characters." }),
    author: z.string().min(1),
    thumbnail: z.string().min(1, { message: "Please upload a thumbnail for your post" }),
});