"use server";

import dbConnect from "@/lib/utils/mongooseConnection";
import { Post, User } from "@/models/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Server action to create a post
export default async function createPost(newPost: any) {
    const title = newPost.title;
    const content = newPost.content;
    const authorEmail = newPost.author;
    const thumbnail = newPost.thumbnail

    await dbConnect();

    const authorObject = await User.findOne({ email: authorEmail });
    const author = authorObject?._id;

    try {
        const post = await Post.create({
            title,
            content,
            author,
            thumbnail,
        });
    } catch (error: any) {
        throw new Error(`Error creating post: ${error.message}`);
    }
    revalidatePath("/home");
    redirect("/home?success=true");
}
