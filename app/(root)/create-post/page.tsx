// Next auth
import { getServerSession } from "next-auth";

// Next navigation
import { redirect } from "next/navigation";

// Options
import { authOptions } from "@/lib/utils/auth";

// db
import dbConnect from "@/lib/utils/mongooseConnection";

// server action
import PostForm from "@/components/PostForm";

export default async function Home() {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // If there is no session, the user is redirected to authentication
    if (!session) {
        redirect("/auth");
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
            <PostForm session={session} />
        </main>
    );
}
