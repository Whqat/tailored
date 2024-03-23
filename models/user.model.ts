import mongoose from "mongoose";

const Schema = mongoose.Schema

// user schema with name, email, and image
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 200,
        default: "Bio",
    },
    image: {
        type: String,
        required: true,
    },
});

// export models
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
