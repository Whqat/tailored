// Next auth
import { getServerSession } from "next-auth";

// Next navigation
import { redirect } from "next/navigation";

// Options
import { authOptions } from "@/lib/utils/auth";


// server action
import PostForm from "@/components/PostForm";

export default async function Home() {
    const session = await getServerSession(authOptions);

    // If there is no session, the user is redirected to authentication
    if (!session) {
        redirect("/auth");
    }

    return (
        <div className="flex min-h-screen flex-col items-center gap-10 px-20 py-8">
            <PostForm session={session} />
        </div>
    );
}
