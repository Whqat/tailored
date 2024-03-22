"use client";

import createPost from "@/app/(root)/create-post/action";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { z } from "zod";

import { UploadButton } from "@/components/Uploadthing";
import { useState } from "react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

const PostForm = ({ session }: { session: Session }) => {
    const [thumbnail, setThumbnail] = useState("");

    const PostSchema = z.object({
        title: z
            .string()
            .trim()
            .min(5, { message: "Title must be at least 5 characters long" })
            .max(50, { message: "Title must not exceed 50 characters" }),
        content: z
            .string()
            .trim()
            .min(24, { message: "Post content must be at least 24 characters" })
            .max(1200, { message: "Post content cannot exceed 1200 characters." }),
        author: z.string().min(1),
        thumbnail: z.string().min(1, { message: "Please upload a thumbnail for your post" }),
    });
    const clientAction = async (formData: FormData) => {
        const newPost = {
            title: formData.get("title"),
            content: formData.get("content"),
            author: formData.get("author"),
            thumbnail: formData.get("thumbnail"),
        };

        const result = PostSchema.safeParse(newPost);
        if (!result.success) {
            result.error.format();

            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });

            return;
        }
        await createPost(result.data);
    };

    return (
        <form action={clientAction}>
            <input
                type="hidden"
                name="author"
                id="author"
                value={session?.user?.email as string}
            />
            <div className="mt-1 container w-screen shadow-inner flex flex-col gap-6 md:gap-8 lg:gap-10 p-10 md:px-20 md:pt-10 md:pb-14 lg:px-32 lg:pb-20 bg-base-300 border rounded-lg border-base-content">
                <h1 className="text-center text-xl md:text-3xl lg:text-5xl tracking-wide">
                    Create Post
                </h1>
                <input type="hidden" name="thumbnail" id="thumbnail" value={thumbnail} />
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt="thumbnail"
                        width="300"
                        height="300"
                        className="object-cover self-center shadow-md"
                    />
                )}
                <div className="flex justify-center gap-3 md:gap-5 lg:gap-10">
                    <label htmlFor="thumbnail" className="relative top-2 text-lg">Thumbnail</label>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            setThumbnail(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast.error(`ERROR! ${error.message}`);
                            toast.error(`Please try refreshing the page.`);
                        }}
                    />
                </div>
                <fieldset className="container flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 text-base-100-content outline-none placeholder-base-content/50"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="title"
                    />
                </fieldset>

                <fieldset className="container flex flex-col gap-1">
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 text-base-100-content outline-none placeholder-base-content/50"
                        name="content"
                        id="content"
                        placeholder="content"
                        rows={5}
                    />
                </fieldset>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default PostForm;
