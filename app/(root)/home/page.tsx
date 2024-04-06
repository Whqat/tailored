"use client";

import PostCard from "@/components/PostCard";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ApiPostInterface {
    _id: string;
    title: string;
    content: string;
    author: string;
    authorName: string;
    authorImage: string;
    thumbnail: string;
    likes: string[];
    createdAt: Date;
}

export default function Home() {
    const params = useSearchParams();
    const router = useRouter();
    const [scrollPosition, setScrollPosition] = useState<number | null>(null);
    const [numberOfPostsInDb, setNumberOfPostsInDb] = useState(0);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleLoadMore = () => {
        setScrollPosition(window.scrollY || null);
        setPage(page + 1);
    };

    const handleFormSubmit = (formData: FormData) => {
        const searchQuery = formData.get("search") as string | null;
        if (searchQuery) {
            setPosts([]);
            setSearch(searchQuery);
        } else {
            toast.error("Please enter a valid search query");
        }
    };

    const handleClearSearch = (e: any = undefined) => {
        if (e) {
            e.preventDefault();
        }
        setSearch("");
        setPosts([]);
        setPage(1);
        const el = document.getElementById("search") as HTMLInputElement;
        if (el) {
            el.value = "";
        }
        toast.success("Search cleared");
        router.refresh();
    };

    // fetch posts from api
    useEffect(() => {
        const fetchPosts = async () => {
            setPostsLoading(true);
            try {
                const response = await fetch(`/api/posts?page=${page}&search=${search}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setPosts(posts.concat(data.posts));
                setNumberOfPostsInDb(data.numberOfPosts);
            } catch (err) {
                console.error(err);
            } finally {
                setPostsLoading(false);
            }
        };

        fetchPosts();
    }, [page, search]); // Re-run effect on page change

    // maintain scroll position when posts are loaded (upon clikcing Load more)
    useEffect(() => {
        if (scrollPosition) {
            window.scrollTo(0, scrollPosition);
        }
    }, [posts]); // Re-run effect on post change

    useEffect(() => {
        if (params.get("success")) {
            toast.success("Post created sucessfully");
            router.push("/home"); // Clear query param
        }
    }, [params]); // Re-run effect on query param change

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-8 md:p-12 lg:p-16">
            <h1 className="text-2xl sm:text-3xl tracking-wide md:text-4xl md:tracking-wider text-base-content font-bold">
                Posts
            </h1>
            <form action={handleFormSubmit} className="flex flex-row gap-2 mb-5">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    name="search"
                    id="search"
                    placeholder="Search posts..."
                />
                <button type="submit" className="btn btn-primary font-bold rounded-lg">
                    <Image src="/search-gray.svg" alt="Search" width={20} height={20} />
                </button>
                <button
                    className="btn btn-secondary font-bold rounded-lg"
                    onClick={handleClearSearch}
                >
                    <Image src="/delete.svg" alt="Clear" width={20} height={20} />
                </button>
            </form>
            <div className="container flex flex-wrap gap-5 justify-around">
                {postsLoading ? (
                    <p className="text-center font-medium">Loading posts...</p>
                ) : (
                    <div className="container flex flex-wrap gap-4 md:gap-5 lg:gap-7 justify-center">
                        {posts ? (
                            posts.map((post: ApiPostInterface) => {
                                // Check for search filter, if exists filter posts
                                if (search) {
                                    if (
                                        !post.title
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) &&
                                        !post.content
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    ) {
                                        return null;
                                    }
                                }

                                // Format date
                                const date = new Date(post.createdAt);
                                const formattedDate = date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                                return (
                                    <SessionProvider key={post._id}>
                                        <PostCard
                                            key={post._id.toString()}
                                            id={post._id.toString()}
                                            title={post.title}
                                            content={post.content}
                                            authorId={post.author.toString()}
                                            authorName={post.authorName}
                                            authorImage={post.authorImage}
                                            thumbnail={post.thumbnail}
                                            likes={post.likes}
                                            date={formattedDate}
                                        />
                                    </SessionProvider>
                                );
                            })
                        ) : (
                            <h1 className="text-base-content md:text-4xl lg:text-5xl">
                                No posts.
                            </h1>
                        )}
                    </div>
                )}
                {numberOfPostsInDb > posts.length && (
                    <button
                        type="button"
                        className="btn btn-primary font-bold px-6 mt-2 py-2 mx-auto rounded-lg"
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>
                )}
            </div>
        </main>
    );
}
