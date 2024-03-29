import type { Metadata } from "next";
import "./globals.css";
import dbConnect from "@/lib/utils/mongooseConnection";


export const metadata: Metadata = {
    title: "Next App + Next Auth - Template",
    description: "Authentication template for Next.js applications",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`bg-base-100 min-h-full h-fit absolute inset-0 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`}
            >
                {children}
            </body>
        </html>
    );
}
