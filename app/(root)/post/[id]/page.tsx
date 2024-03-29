import { authOptions } from "@/lib/utils/auth";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import dbConnect from "@/lib/utils/mongooseConnection";
import PostView from "@/components/PostView";
import { Post } from "@/models/post.model";

const PostPage = async ({ params }: { params: Params }) => {
    const id = params.id;

    try {
        await dbConnect()
        const post = await Post.findById(id);
        const session = await getServerSession(authOptions);
        const isOwner = session?.user?.id === post.author.toString();

        return <PostView post={post} isOwner={isOwner} />;
    } catch (error) {
        throw new Error("No post found with that ID.");
    }
};

export default PostPage;
