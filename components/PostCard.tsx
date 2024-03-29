import Link from "next/link";
import { User } from "@/models/user.model";
import dbConnect from "@/lib/utils/mongooseConnection";
import Image from "next/image";
interface Props {
    id: string;
    title: string;
    content: string;
    authorId: string;
    thumbnail: string;
    date: string;
}

const PostCard = async ({ id, title, content, authorId, thumbnail, date }: Props) => {
    await dbConnect();

    const author = await User.findById(authorId);
    const authorName = author.name;
    const authorImage = author.image;
    
    return (
        <div className="group card rounded-3xl relative border-2 cursor-pointer overflow-hidden border-base-content w-screen max-h-[13rem] sm:max-h-[16rem] md:max-h-[18rem] lg:max-h-[20rem] bg-base-100 shadow-inner image-full">
            <figure className="h-full blur-sm brightness-[13%] group-hover:blur-none group-hover:brightness-[55%] hover:p-0 transition duration-300 ease-in-out">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="h-full border-none w-full object-cover shadow-inner rounded-none"
                />
            </figure>
            <div className="card-body p-5 sm:p-6 md:p-7 lg:p-8 max-h-[18rem] lg:max-h-[20rem] line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
                <h2 className="card-title mb-2 md:mb-4 lg:mb-6 tracking-wider line-clamp-1">{title}</h2>
                <p className="overflow-clip text-clip">{content}</p>
                <div className="card-actions justify-end">
                    <Link href={`post/${id}`} className="absolute inset-0 z-30"></Link>
                    <Link
                        className="link link-primary line-clamp-1 text-sm rounded-xl backdrop-brightness-50 border-base-content justify-center items-center flex gap-1 lg:gap-2 mt-4 font-bold mb-2 z-30 px-3 py-2"
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
