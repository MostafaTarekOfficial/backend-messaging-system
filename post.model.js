import mongoose from "mongoose";
//create the posts model
const postSchema = new mongoose.Schema(
    {
        id:
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref : "User"
        },
        title: {
            type: String,
            required : true
        },
        content : {
            type:String,
            required : true
        }
    }
)
//check if the post model already exists
const Post = mongoose.models.post || mongoose.model('post',postSchema)
export default Post