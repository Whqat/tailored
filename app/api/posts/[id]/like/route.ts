import { Post } from "@/models/post.model";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const postID = params.id;

    const body = await req.json();

    // Input validation
    if (!postID || typeof postID !== "string") {
        return Response.json({ message: "Invalid postID" }, { status: 400 });
    }

    // Protected
    if (!body.authenticated === true) {
        return Response.json({ message: "Unauthenticated" }, { status: 403 });
    }

    // Body validation
    if (!body.action || (body.action !== "like" && body.action !== "unlike")) {
        return Response.json(
            { message: "Please specify an action in the body (like or unlike)" },
            { status: 401 }
        );
    }

    try {
        // Like post
        if (body.action === "like") {
            const post = await Post.findByIdAndUpdate(postID, { $push: { likes: body.user } });
            if (!post) {
                return Response.json({ message: "Post not found" }, { status: 404 });
            }
            return Response.json({ post }, { status: 200 });
        }
        // Unlike post
        else if (body.action === "unlike") {
            const post = await Post.findByIdAndUpdate(postID, { $pull: { likes: body.user } });
            if (!post) {
                return Response.json({ message: "Post not found" }, { status: 404 });
            }
            return Response.json({ post }, { status: 200 });
        }
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
