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
            <div className="flex justify-center">
                <div className="w-[500px] h-[500] mt-5 rounded-full flex items-center justify-center">
                    <Image
                        src={post.thumbnail as string}
                        alt="Thumbnail"
                        width={500}
                        height={500}
                        className="p-1 shadow-inner shadow-primary"
                    />
                </div>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-8 mb-2 md:mb-5 lg:mb-8">{post.title}</h1>
                <p className="mx-auto mt-2 px-5 py-1 max-w-[45ch] sm:max-w-[70ch] md:max-w-[90ch] lg:max-w-[135ch] whitespace-pre-wrap break-words">
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
