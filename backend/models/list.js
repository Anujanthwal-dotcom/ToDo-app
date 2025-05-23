import mongoose from "mongoose";

const listSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        }
        ,
        body:{
            type: String,
            required: true,
        }
        ,
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
)

export default mongoose.model("List", listSchema);
