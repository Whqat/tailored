import { Post } from "@/models/post.model";
import { User } from "@/models/user.model";
import { type NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const postID = params.id;

    const body = await req.json();

    if (!body.isOwner) {
        return Response.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Input validation (optional)
    if (!postID || typeof postID !== "string") {
        return Response.json({ message: "Invalid userID" }, { status: 400 });
    }

    try {
        // Find post by ID
        const post = await Post.findById(postID);
        const user = await User.findById(post.author);

        await Post.findByIdAndDelete(postID);
        await User.findByIdAndUpdate(user._id, { $pull: { posts: postID } });

        if (!post) {
            return Response.json({ message: "Post not found" }, { status: 404 });
        }

        return Response.json({ post }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
