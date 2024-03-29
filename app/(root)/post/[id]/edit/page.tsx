import PostEdit from "@/components/PostEdit";
import { authOptions } from "@/lib/utils/auth";
import dbConnect from "@/lib/utils/mongooseConnection";
import { User } from "@/models/user.model";
import { Post } from "@/models/post.model";
import { getServerSession } from "next-auth";

export default async function PostEditPage({ params, searchParams }: any) {
    const session = await getServerSession(authOptions);
    await dbConnect();
    
    const post = await Post.findById(params.id);

    if (!session || post.author.toString() !== session.user.id) {
        throw new Error("You are not authorized to edit this post");
    }

    const user = await User.findById(session.user.id);

    return (
        <div className="flex min-h-screen flex-col items-center gap-10 p-24">
            <PostEdit session={session} user={user} post={post} />
        </div>
    );
}