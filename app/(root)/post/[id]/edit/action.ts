"use server";

import dbConnect from "@/lib/utils/mongooseConnection";
import { Post } from "@/models/post.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Server action to update User
export default async function updatePost(newInfo: any) {
    const id = newInfo.id;
    const title = newInfo.title;
    const content = newInfo.content;
    const thumbnail = newInfo.thumbnail;

    await dbConnect();

    try {
        await Post.findByIdAndUpdate(id, { title, content, thumbnail });
    } catch (error: any) {
        throw new Error(`Error updating post: ${error.message}`);
    }
    revalidatePath(`/post/${id}`);
    redirect(`/post/${id}`);
}

