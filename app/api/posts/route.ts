import { Post } from "@/models/post.model";
import { User } from "@/models/user.model";
import dbConnect from "@/lib/utils/mongooseConnection";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));

    try {
        // Pagination logic (adjust as needed)
        const limit = 3; // adjust limit as needed
        const skip = (page - 1) * limit;

        await dbConnect();

        // Find all posts for the user with pagination
        const posts = await Post.find()
            .lean()
            .sort({ createdAt: -1 }) // sort by latest first (optional)
            .limit(limit)
            .skip(skip);

        const modifiedPostsPromises = posts.map(async (post) => {
            const authorObject = await User.findById(post.author);
            return {
                ...post,
                authorName: authorObject.name,
                authorImage: authorObject.image,
            };
        });

        const modifiedPosts = await Promise.all(modifiedPostsPromises);

        return Response.json({ posts: modifiedPosts, numberOfPosts: await Post.countDocuments() }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
