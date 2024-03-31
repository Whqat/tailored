"use client";
import Link from "next/link";

interface Props {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    date: string;
}

const PostCardClient = async ({ id, title, content, thumbnail, date }: Props) => {
    return (
        <div className="group card max-w-96 rounded-3xl relative border-2 cursor-pointer overflow-hidden border-base-content max-h-[10.5rem] sm:max-h-[12rem] md:max-h-[16rem] lg:max-h-[18.75rem] bg-base-100 shadow-inner image-full">
            <Link href={`/post/${id}`} scroll={false} className="absolute inset-0 z-30"></Link>
            <figure className="h-full blur-sm brightness-[15%] group-hover:blur-none group-hover:brightness-75 hover:p-0 transition duration-300 ease-in-out">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="h-full border-none w-full object-cover shadow-inner rounded-none"
                />
            </figure>
            <div className="card-body p-5 sm:p-6 md:p-7 lg:p-8 lg:pb-12 max-h-[18rem] md:max-h-[20rem] line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
                <h2 className="card-title mb-2 md:mb-4 lg:mb-6 tracking-wider line-clamp-1">
                    {title}
                </h2>
                <p className="overflow-clip text-clip">{content}</p>
                <p className="text-right ml-auto text-primary backdrop-brightness-50 rounded-md w-fit p-1 text-sm mt-2 mb-1">
                    {date}
                </p>
            </div>
        </div>
    );
};

export default PostCardClient;
