"use client";

import createPost from "@/app/(root)/create-post/action";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { PostSchema } from "@/types/post.type";

import { UploadButton } from "@/components/Uploadthing";
import { useState } from "react";
import Image from "next/image";

const PostForm = ({ session }: { session: Session }) => {
    const [thumbnail, setThumbnail] = useState("");
 
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
                value={session.user.id}
            />
            <div className="container font-bold tracking-wide w-screen shadow-inner flex flex-col gap-6 md:gap-8 lg:gap-10 p-10 md:px-20 md:pt-10 md:pb-14 lg:px-32 lg:pb-20 bg-base-200 border rounded-lg border-base-content">
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
                        className="object-cover self-center shadow-md border border-base-content bg-base-content"
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
                <fieldset className="container flex flex-col gap-1 p-2 md:p-5 lg:p-8">
                    <label htmlFor="title">Title</label>
                    <input
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter the title here"
                    />
                </fieldset>

                <fieldset className="container flex flex-col gap-1 p-2 md:p-5 lg:p-8">
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        name="content"
                        id="content"
                        placeholder="Enter the content here"
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
