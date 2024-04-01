"use client"
import Link from "next/link";
import Image from "next/image";
interface Props {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    thumbnail: string;
    date: string;
}

const PostCard = ({ id, title, content, authorId, authorName, authorImage, thumbnail, date }: Props) => {

    return (
        <div className="group hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-300 border-t-4 border-r border-primary card rounded-3xl relative cursor-pointer overflow-hidden w-screen max-h-[11.75rem] sm:max-h-[13.5rem] md:max-h-[16rem] lg:max-h-[20rem] bg-base-100 image-full">
            <figure className="h-full p-0.5 group-hover:blur-sm group-hover:brightness-[13%] blur-none brightness-[50%] transition duration-300 ease-in-out">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="h-full border-none w-full object-cover shadow-inner rounded-none"
                />
            </figure>
            <div className="card-body p-5 sm:p-6 md:p-7 lg:p-8 max-[335px]:line-clamp-1 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
                <h2 className="card-title lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6 text-white tracking-wider line-clamp-1">{title}</h2>
                <p className="overflow-clip text-clip text-white tracking-wide font-normal">{content}</p>
                <div className="card-actions justify-end">
                    <Link href={`post/${id}`} scroll={false} className="absolute inset-0 z-30"></Link>
                    <Link
                        className="text-white line-clamp-1 text-xs md:text-sm rounded-xl border-b border-l group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 hover:underline transition-all border-primary justify-center items-center flex gap-1 lg:gap-2 mt-2 mb-1 md:mt-4 md:mb-2 font-medium tracking-wide z-30 px-2 py-1 md:px-3 md:py-2"
                        scroll={false}
                        href={`/profile/${authorId.toString()}`}
                    >
                        <Image
                            src={authorImage}
                            alt="PFP"
                            width={40}
                            height={40}
                            className="min-h-[40px] min-w-[40px] object-cover rounded-full border border-base-content p-0.5"
                        />{" "}
                        {authorName} - {date}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
