import { Session } from "next-auth";
import { LogoutButton } from "./auth/LogoutButton";
import Link from "next/link";

const Navbar = ({ session, userId }: { session: Session | null, userId: string | null }) => {
    return (
        <div className="relative navbar z-50 bg-base-100 border-b border-base-content md:px-10 lg:px-16">
            <div className="flex-1">
                <Link href="/home" className="btn btn-ghost text-xl">tailorit</Link>
            </div>
            <div className="flex-none gap-2">
                {session ? (
                    
                    <>
                        <ul className="menu menu-horizontal">
                            <li>
                                <Link href="/create-post">Post</Link>
                            </li>
                        </ul>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 lg:w-12 bg-base-300 rounded-full border border-base-300 object-fit">
                                    <img
                                        alt="PFP"
                                        src={session?.user?.image as string}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1000] px-3 py-4 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
                            >
                                <li>
                                    <Link href={`/profile/${userId}`}>Profile</Link>
                                </li>
                                <li>
                                    <a>Settings</a>
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
                                <Link href="/create-post">Post</Link>
                            </li>
                            <li>
                                <Link href="/auth" className="bg-primary text-primary-content hover:bg-primary/80 ml-1">Log in</Link>
                            </li>
                        </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
