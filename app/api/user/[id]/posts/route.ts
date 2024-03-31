import { User } from "@/models/user.model";
import { Post } from "@/models/post.model";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userID = params.id;
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));

    // Input validation (optional)
    if (!userID || typeof userID !== "string") {
        return Response.json({ message: "Invalid userID" }, { status: 400 });
    }

    try {
        // Find user by ID
        const user = await User.findById(userID);

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        // Pagination logic (adjust as needed)
        const limit = 3; // adjust limit as needed
        const skip = (page - 1) * limit;

        // Find all posts for the user with pagination
        const posts = await Post.find({ author: user._id })
            .sort({ createdAt: -1 }) // sort by latest first (optional)
            .limit(limit)
            .skip(skip);

        return Response.json({ posts: posts }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
