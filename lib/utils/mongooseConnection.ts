// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


async function dbConnect() {
    return await mongoose.connect(MONGODB_URI);
}
    

export default dbConnect;