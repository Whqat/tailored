"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface UserInterface {
    _id: number;
    name: string;
    email: string;
    image: string;
    bio: string;
}

interface Props {
    user: UserInterface;
    isOwner: boolean;
}

const Profile = ({ user, isOwner }: Props) => {
    const router = useRouter();

    if (!user) throw new Error("No user found that with ID.");

      return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-base-300 text-base-content">
          <div className="flex justify-center">
            <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <Image
                src={user.image as string}
                alt="Profile picture"
                width={150}
                height={150}
                className="rounded-full border-2 border-base-content p-1 bg-base-content"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mt-8">{user.name}</h1>
          {user.bio && (
            <p className="mx-auto mt-2 px-5 py-1 max-w-[60ch] whitespace-pre-wrap break-words">
              {user.bio}
            </p>
          )}
          <div className="flex flex-col gap-6 mt-5">
            {isOwner && (
              <button
                type="button"
                className="btn btn-primary font-bold px-6 py-2 rounded-lg"
                onClick={() => router.push(`/profile/${user._id}/edit`)}
              >
                Edit Account
              </button>
            )}
          </div>
        </div>
      );
};

export default Profile;
