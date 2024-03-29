"use server";

import dbConnect from "@/lib/utils/mongooseConnection";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Server action to update User
export default async function updateUser(newInfo: any) {
    const id = newInfo.id;
    const name = newInfo.name;
    const bio = newInfo.bio;
    const image = newInfo.image;

    await dbConnect();

    try {
        await User.findByIdAndUpdate(id, { name, bio, image }, { upsert: true });
    } catch (error: any) {
        throw new Error(`Error Updating user: ${error.message}`);
    }
    revalidatePath(`/profile/${id}`);
    redirect(`/profile/${id}`);
}