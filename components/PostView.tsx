"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostInterface {
    _id: string;
    title: string;
    content: string;
    author: string;
    thumbnail: string;
}

interface Props {
    post: PostInterface;
    isOwner: boolean;
}

const PostView = ({ post, isOwner }: Props) => {
    const router = useRouter();

    if (!post) throw new Error("No post found that with ID.");

    return (
        <div className="w-screen px-10 md:px-16 flex flex-col justify-center items-center bg-base-300 text-base-content">
            <div className="flex flex-col gap-10 md:gap-1 px-5 md:px-24 mb-5 mt-10 md:flex-row-reverse items-center">
                <div className="lg:w-[800px] border-b border-base-content flex flex-col items-center justify-center">
                    <Image
                        src={post.thumbnail as string}
                        alt="Thumbnail"
                        width={500}
                        height={500}
                        className="p-1"
                    />
                </div>
                <h1 className="text-2xl break-words tracking-wider whitespace-pre-wrap text-center md:text-3xl lg:text-4xl font-bold">
                    {post.title}
                </h1>
            </div>
            <p className="mx-auto tracking-wide text-lg md:text-xl lg:text-2xl mt-2 px-5 py-1 max-w-[45ch] sm:max-w-[70ch] md:max-w-[90ch] lg:max-w-[135ch] whitespace-pre-wrap break-words">
                {post.content}
            </p>
            <div className="flex flex-col gap-6 mt-5">
                {isOwner && (
                    <button
                        type="button"
                        className="btn btn-primary font-bold mb-3 px-6 py-2 rounded-lg"
                        onClick={() => router.push(`/post/${post._id}/edit`)}
                    >
                        Edit Post
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostView;
