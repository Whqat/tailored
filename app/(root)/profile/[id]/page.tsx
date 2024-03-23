import { authOptions } from "@/lib/utils/auth";
import { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Profile from "@/components/Profile";
import dbConnect from "@/lib/utils/mongooseConnection";

const ProfilePage = async ({ params }: { params: Params }) => {
    const id = params.id;

    try {
        await dbConnect()
        const user = await User.findById(id);
        const session = await getServerSession(authOptions);
        const isOwner = session?.user?.email === user.email;

        return <Profile user={user} isOwner={isOwner} />;
    } catch (error) {
        throw new Error("No user found with that ID.");
    }
};

export default ProfilePage;
