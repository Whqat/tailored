"use client";

import { Session } from "next-auth";
import updateUser from "@/app/(root)/profile/[id]/edit/action";
import toast from "react-hot-toast";
import { UserSchema } from "@/types/user.type";
import { UploadButton } from "@/components/Uploadthing";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

interface UserInterface {
    _id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
    posts: string[]
}

interface Props {
    user: UserInterface;
    session: Session;
}

const ProfileEdit = ({ session, user }: Props) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        setImage(user.image);
        setName(user.name);
        setBio(user.bio);
    }, []);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "bio":
                setBio(value);
                break;
            default:
                break;
        }
    };

    const clientAction = async (formData: FormData) => {
        const updatedUser = {
            id: formData.get("userId"),
            name: formData.get("name"),
            bio: formData.get("bio"),
            image: formData.get("image"),
        };

        const result = UserSchema.safeParse(updatedUser);
        if (!result.success) {
            result.error.format();

            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });

            return;
        }
        await updateUser(result.data);
    };

    return (
        <form action={clientAction}>
            <input type="hidden" name="userId" id="userId" value={session.user.id} />
            <div className="mt-1 container font-bold tracking-wide w-screen shadow-inner flex flex-col gap-6 md:gap-8 lg:gap-10 p-10 md:px-20 md:pt-10 md:pb-14 lg:px-32 lg:pb-20 bg-base-200 border rounded-lg border-base-content">
                <h1 className="text-center text-xl md:text-3xl lg:text-5xl tracking-wide">
                    Update profile
                </h1>
                <input type="hidden" name="image" id="image" value={image} />
                {image && (
                    <Image
                        src={image}
                        alt="image"
                        width="300"
                        height="300"
                        className="rounded-[100%] min-w-[150px] min-h-[150px] object-cover self-center shadow-md border border-base-content bg-base-content"
                    />
                )}
                <div className="flex justify-center gap-3 md:gap-5 lg:gap-10">
                    <label htmlFor="image" className="relative top-2 text-lg">
                        Profile Photo
                    </label>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            setImage(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast.error(`ERROR! ${error.message}`);
                            toast.error(`Please try refreshing the page.`);
                        }}
                    />
                </div>
                <fieldset className="container flex flex-col gap-1 p-2 md:p-5 lg:p-8">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(e) => handleOnChange(e)}
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter the name here"
                        value={name}
                    />
                </fieldset>

                <fieldset className="container flex flex-col gap-1 p-2 md:p-5 lg:p-8">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        onChange={(e) => handleOnChange(e)}
                        className="px-4 py-2 md:px-7 md:py-3 lg:px-10 bg-base-100 border border-base-content rounded-md text-base-content outline-none placeholder-base-content/50"
                        name="bio"
                        id="bio"
                        placeholder="Enter the bio here"
                        rows={5}
                        value={bio}
                    />
                </fieldset>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProfileEdit;
