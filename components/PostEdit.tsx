"use client";

import { Session } from "next-auth";
import toast from "react-hot-toast";
import { UploadButton } from "@/components/Uploadthing";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import updatePost from "@/app/(root)/post/[id]/edit/action";
import { PostSchema } from "@/types/post.type";

interface UserInterface {
    _id: string;
    name: string;
    email: string;
    thumbnail: string;
    content: string;
    posts: string[];
}

interface PostInterface {
    _id: string;
    title: string;
    content: string;
    author: string;
    thumbnail: string;
    createdAt: Date;
}

interface Props {
    post: PostInterface;
    user: UserInterface;
    session: Session;
}

const PostEdit = ({ session, user, post }: Props) => {
    const [thumbnail, setThumbnail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setThumbnail(post.thumbnail);
        setTitle(post.title);
        setContent(post.content);
    }, []);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;

        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "content":
                setContent(value);
                break;
            default:
                break;
        }
    };

    const clientAction = async (formData: FormData) => {
        const updatedPost = {
            id: formData.get("postId"),
            author: formData.get("authorId"),
            title: formData.get("title"),
            content: formData.get("content"),
            thumbnail: formData.get("thumbnail"),
        };

        const result = PostSchema.safeParse(updatedPost);
        if (!result.success) {
            result.error.format();

            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });

            return;
        }
        await updatePost(result.data);
    };

    return (
        <form action={clientAction}>
            <input type="hidden" name="postId" id="postId" value={post._id.toString() } />
            <input type="hidden" name="authorId" id="authorId" value={post.author.toString() } />
            <div className="mt-1 container font-bold tracking-wide w-screen shadow-inner flex flex-col gap-6 md:gap-8 lg:gap-10 p-10 md:px-20 md:pt-10 md:pb-14 lg:px-32 lg:pb-20 bg-base-200 border rounded-lg border-base-content">
                <h1 className="text-center text-xl md:text-3xl lg:text-5xl tracking-wide">
                    Update post
                </h1>
                <input type="hidden" name="thumbnail" id="thumbnail" value={thumbnail} />
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt="thumbnail"
                        width="300"
                        height="300"
                        className="min-w-[150px] min-h-[150px] object-cover self-center shadow-md border border-base-content bg-base-content"
                    />
                )}
                <div className="flex justify-center gap-3 md:gap-5 lg:gap-10">
                    <label htmlFor="thumbnail" className="relative top-2 text-lg">
                        Thumbnail
                    </label>
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
                        onChange={(e) => handleOnChange(e)}
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter the name here"
                        value={title}
                    />
                </fieldset>

                <fieldset className="container flex flex-col gap-1 p-2 md:p-5 lg:p-8">
                    <label htmlFor="content">Bio</label>
                    <textarea
                        onChange={(e) => handleOnChange(e)}
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        name="content"
                        id="content"
                        placeholder="Enter the content here"
                        rows={5}
                        value={content}
                    />
                </fieldset>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default PostEdit;
