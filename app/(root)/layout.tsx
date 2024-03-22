import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import "@uploadthing/react/styles.css";
import "../globals.css";


export const metadata: Metadata = {
    title: "Next App + Next Auth - Template",
    description: "Authentication template for Next.js applications",
};

import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <main className="h-full overflow-x-hidden">
            <Navbar session={session} />
            {children}

            <Toaster position="bottom-right" />
        </main>
    );
}
