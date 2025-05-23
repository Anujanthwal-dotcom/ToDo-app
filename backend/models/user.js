import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        todo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "List",
            },
        ],
    }
);

export default mongoose.model("User", userSchema);
// This code defines a Mongoose schema and model for a User entity in a MongoDB database.