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
        <div className="group hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-300 border-t-4 border-r border-primary card rounded-3xl relative cursor-pointer overflow-hidden w-screen max-h-[13rem] sm:max-h-[16rem] md:max-h-[18rem] lg:max-h-[20rem] bg-base-100 image-full">
            <figure className="h-full p-0.5 group-hover:blur-sm group-hover:brightness-[13%] blur-none brightness-[50%] transition duration-300 ease-in-out">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="h-full border-none w-full object-cover shadow-inner rounded-none"
                />
            </figure>
            <div className="card-body p-5 sm:p-6 md:p-7 lg:p-8 max-h-[18rem] lg:max-h-[20rem] line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
                <h2 className="card-title lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6 text-white tracking-wider line-clamp-1">{title}</h2>
                <p className="overflow-clip text-clip text-white tracking-wide font-normal">{content}</p>
                <div className="card-actions justify-end">
                    <Link href={`post/${id}`} className="absolute inset-0 z-30"></Link>
                    <Link
                        className="text-white line-clamp-1 text-sm rounded-xl border-b border-l group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300 hover:underline transition-all border-primary justify-center items-center flex gap-1 lg:gap-2 mt-4 font-medium tracking-wide mb-2 z-30 px-3 py-2"
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
