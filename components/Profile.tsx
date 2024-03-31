"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import PostCardClient from "./PostCardClient";

interface PostInterface {
    _id: string;
    title: string;
    content: string;
    author: string;
    thumbnail: string;
    createdAt: Date;
}

interface UserInterface {
    _id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
    posts: any;
}

interface Props {
    user: UserInterface;
    isOwner: boolean;
}

const Profile = ({ user, isOwner }: Props) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);

    if (!user) throw new Error("No user found that with ID.");

    useEffect(() => {
        const fetchPosts = async () => {
            setPostsLoading(true);
            try {
                const response = await fetch(`/api/user/${user._id}/posts?page=${page}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setPosts(posts.concat(data.posts));
            } catch (err) {
                console.error(err);
            } finally {
                setPostsLoading(false);
            }
        };

        fetchPosts();
    }, [user._id, page]); // Re-run effect on user change

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-base-300 text-base-content pb-20">
            <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center">
                    <Image
                        src={user.image as string}
                        alt="Profile picture"
                        width={150}
                        height={150}
                        className="rounded-[100%] min-w-[150px] object-cover min-h-[150px] border border-base-content p-1 bg-base-content"
                    />
                </div>
                <div className="flex gap-1 flex-col">
                    <h1 className="text-4xl text-center md:text-left font-bold mt-2">
                        {user.name}
                    </h1>
                    <p className="mt-2 text-center md:text-left py-1 max-w-[60ch] whitespace-pre-wrap break-words">
                        {user.bio}
                    </p>
                    {isOwner && (
                        <button
                            type="button"
                            className="btn btn-primary font-bold px-6 mt-2 py-2 rounded-lg"
                            onClick={() => router.push(`/profile/${user._id}/edit`)}
                        >
                            Edit Account
                        </button>
                    )}
                </div>
            </div>

            <div>
                <h1 className="text-3xl md:text-4xl font-bold mt-8 text-center mb-6 md:mb-7 lg:mb-8">
                    {user.name}'s Posts
                </h1>
                {postsLoading ? (
                    <p className="text-center font-medium">Loading posts...</p>
                ) : (
                    <div className="container flex flex-wrap gap-4 justify-center">
                        {posts ? (
                            posts.map((post: PostInterface) => {
                                const date = new Date(post.createdAt);
                                const formattedDate = date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                                return (
                                    <PostCardClient
                                        key={post._id.toString()}
                                        id={post._id.toString()}
                                        title={post.title}
                                        content={post.content}
                                        thumbnail={post.thumbnail}
                                        date={formattedDate}
                                    />
                                );
                            })
                        ) : (
                            <h1 className="text-base-content md:text-4xl lg:text-5xl">
                                No posts.
                            </h1>
                        )}
                    </div>
                )}
                {user.posts.length > posts.length && (
                    <button
                        type="button"
                        className="btn btn-primary font-bold px-6 mt-2 py-2 rounded-lg"
                        onClick={() => setPage(page + 1)}
                    >
                        Load more
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
