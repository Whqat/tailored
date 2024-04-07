import { LogoutButton } from "./auth/LogoutButton";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/lib/utils/auth";
import { getServerSession } from "next-auth";

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="relative navbar z-50 bg-base-100 border-b border-base-content md:px-10 lg:px-16">
            <div className="flex-1">
                <Link href="/home" scroll={false} className="btn btn-ghost text-xl">
                    <Image src="/logo-no-background.svg" width="80" height="80" alt="Logo" />
                    tailored
                </Link>
            </div>
            <div className="flex-none gap-2">
                {session ? (
                    <>
                        <ul className="menu menu-horizontal">
                            <li>
                                <Link href="/create-post" scroll={false}>
                                    Post
                                </Link>
                            </li>
                        </ul>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 lg:w-12 bg-base-300 rounded-full border border-base-300 object-fit">
                                    <img alt="PFP" src={session?.user?.image as string} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1000] px-3 py-4 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
                            >
                                <li>
                                    <Link href={`/profile/${session?.user?.id}`} scroll={false}>
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <LogoutButton />
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <ul className="menu menu-horizontal">
                        <li>
                            <Link href="/create-post" scroll={false}>
                                Post
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth"
                                scroll={false}
                                className="bg-primary text-primary-content hover:bg-primary/80 ml-1"
                            >
                                Log in
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
