// db
import dbConnect from "@/lib/utils/mongooseConnection";
import { Post } from "@/models/models";
import PostCard from "@/components/PostCard";

export default async function Home() {
    await dbConnect();

    const posts = await Post.find();

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-8 md:p-12 lg:p-20">
            <h1>home</h1>
            <div className="container flex flex-wrap gap-4 justify-center">
                {posts.length > 0 ? (
                    posts.map((post) => {
                        const date = new Date(post.createdAt);
                        const formattedDate = date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
                        return (
                            <PostCard
                                key={post._id}
                                id={post._id.toString()}
                                title={post.title}
                                content={post.content}
                                authorId={post.author}
                                thumbnail={post.thumbnail}
                                date={formattedDate}
                            />
                        );
                    })
                ) : (
                    <h1 className="text-base-content md:text-4xl lg:text-5xl">No posts.</h1>
                )}
            </div>
        </main>
    );
}
