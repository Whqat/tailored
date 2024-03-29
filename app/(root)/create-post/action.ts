"use server";

import dbConnect from "@/lib/utils/mongooseConnection";
import { Post } from "@/models/post.model";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Server action to create a post
export default async function createPost(newPost: any) {
    const title = newPost.title;
    const content = newPost.content;
    const author = newPost.author;
    const thumbnail = newPost.thumbnail;

    await dbConnect();

    try {
        const post = await Post.create({
            title,
            content,
            author,
            thumbnail,
        });
        await User.findByIdAndUpdate(author, { $push: { posts: post._id } });
    } catch (error: any) {
        throw new Error(`Error creating post: ${error.message}`);
    }
    revalidatePath("/home");
    redirect("/home?success=true");
}
