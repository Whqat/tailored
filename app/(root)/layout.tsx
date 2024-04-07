import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import "@uploadthing/react/styles.css";
import "../globals.css";

export const metadata: Metadata = {
    title: "tailored | Home",
    description: "Tailor modern posts on our blogging platform.",
};

import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { User } from "@/models/user.model";
import dbConnect from "@/lib/utils/mongooseConnection";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    await dbConnect();
    const user = await User.findOne({ email: session?.user?.email });
    const userId = await user?._id?.toString();

    return (
        <main className="h-full overflow-x-hidden">
            <Navbar session={session} userId={userId} />
                {children}
            <Toaster position="bottom-right" />
        </main>
    );
}
