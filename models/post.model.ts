import mongoose from "mongoose";

const Schema = mongoose.Schema;

// post schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64,
    },
    content: {
        type: String,
        required: true,
        minlength: 18,
        maxlength: 6240,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
});

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
