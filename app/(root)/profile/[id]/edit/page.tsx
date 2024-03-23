import ProfileEdit from "@/components/ProfileEdit";
import { authOptions } from "@/lib/utils/auth";
import dbConnect from "@/lib/utils/mongooseConnection";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";

export default async function ProfileEditPage({ params, searchParams }: any) {
    const session = await getServerSession(authOptions);

    if (!session || params.id !== session.user.id) {
        throw new Error("You are not authorized to edit this profile");
    }

    await dbConnect();
    const user = await User.findById(session.user.id);

    return (
        <div className="flex min-h-screen flex-col items-center gap-10 p-24">
            <ProfileEdit session={session} user={user} />
        </div>
    );
}
