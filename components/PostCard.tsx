import Link from "next/link";
import { User } from "@/models/user.model";
import { ObjectId } from "mongoose";
import dbConnect from "@/lib/utils/mongooseConnection";
interface Props {
    id: string;
    title: string;
    content: string;
    authorId: ObjectId;
    thumbnail: string;
    date: string;
}

const PostCard = async ({ id, title, content, authorId, thumbnail, date }: Props) => {
    await dbConnect();

    const author = await User.findById(authorId);
    const authorName = author.name;

    return (
        <div className="group card rounded-3xl border-2 cursor-pointer overflow-hidden border-primary w-screen max-h-[13rem] sm:max-h-[16rem] md:max-h-[18rem] lg:max-h-[20rem] bg-base-100 shadow-inner image-full">
            <figure className="h-full blur-sm brightness-[25%] group-hover:blur-none group-hover:brightness-100 hover:p-0 transition duration-300 ease-in-out">
                <img src={thumbnail} alt="Thumbnail" className="h-full border-none w-full object-cover shadow-inner rounded-none" />
            </figure>
            <div className="card-body p-4 sm:p-5 md:p-6 lg:p-8 max-h-[18rem] md:max-h-[18rem] lg:max-h-[20rem] line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
                <h2 className="card-title mb-2 md:mb-4 lg:mb-6 tracking-wider">{title}</h2>
                <p className="overflow-clip text-clip">{content}</p>
                <div className="card-actions justify-end">
                    <Link
                        className="link link-primary mt-10 hover:underline"
                        href={`/profile/${authorId.toString()}`}
                    >
                        {authorName} - {date}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
