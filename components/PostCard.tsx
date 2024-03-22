import Link from "next/link";
import { User } from "@/models/models";
import mongoose, { ObjectId } from "mongoose";
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
    await dbConnect()
    
    const author = await User.findById(authorId);
    const authorName = author.name
    // useEffect(() => {
    //     const fetchAuthorName = async () => {
    //         const authorId = new mongoose.Types.ObjectId(author)
    //         console.log("AUTHORID", authorId)
    //         const authorObject = await User.findById(authorId);
    //         console.log(author, authorObject)
    //     };

    //     fetchAuthorName();
    // }, [author]);

    return (
        <div className="card w-[20rem] h-[20rem] bg-base-100 shadow-xl image-full">
            <figure>
                <img src={thumbnail} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="line-clamp-3">{content}</p>
                <div className="card-actions justify-end">
                    <Link className="link link-primary" href={`/profile/${authorId.toString()}`}>
                        {authorName} - {date}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
