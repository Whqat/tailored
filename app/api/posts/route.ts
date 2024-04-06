import { Post } from "@/models/post.model";
import { User } from "@/models/user.model";
import dbConnect from "@/lib/utils/mongooseConnection";
import { type NextRequest } from "next/server";
import { PiSignpost } from "react-icons/pi";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));
    const search = searchParams.get("search");

    try {
        // Pagination logic
        const limit = 3;
        const skip = (page - 1) * limit;

        await dbConnect();

        // If search query is passed to body
        if (search) {
            // Find all posts for the user with pagination
            const posts = await Post.find({ $text: { $search: search } })
                .lean() // return as a mutable json object
                .sort({ createdAt: -1 }) // sort by latest first (optional)
                .limit(limit)
                .skip(skip);

            // To add authorName and authorImage fields
            const modifiedPostsPromises: Promise<Object>[] = posts.map(async (post) => {
                const authorObject = await User.findById(post.author);
                return {
                    ...post,
                    authorName: authorObject.name,
                    authorImage: authorObject.image,
                };
            });

            // Wait for all mapping to finish
            const modifiedPosts = await Promise.all(modifiedPostsPromises);

            return Response.json(
                {
                    posts: modifiedPosts,
                    numberOfPosts: await Post.countDocuments({ $text: { $search: search } }),
                },
                { status: 200 }
            );
        }

        // Find all posts for the user with pagination
        const posts = await Post.find()
            .lean() // return as a mutable json object
            .sort({ createdAt: -1 }) // sort by latest first (optional)
            .limit(limit)
            .skip(skip);

        const modifiedPostsPromises: Promise<Object>[] = posts.map(async (post) => {
            const authorObject = await User.findById(post.author);
            return {
                ...post,
                authorName: authorObject.name,
                authorImage: authorObject.image,
            };
        });

        // Wait for all mapping to finish
        const modifiedPosts = await Promise.all(modifiedPostsPromises);

        return Response.json(
            { posts: modifiedPosts, numberOfPosts: await Post.countDocuments() },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
