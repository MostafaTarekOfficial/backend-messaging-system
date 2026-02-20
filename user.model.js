import mongoose from "mongoose";
//Create the user Schema 
const userSchema =new mongoose.Schema(
    {
        username:{
            type :String,
            required : true
        },
        email : {
            type:String,
            required : true,
            unique : true
        },
        password : {
            type :String,
            required : true
        }
    }
)
//Check if the model user already exists
const User = mongoose.models.user || mongoose.model('user',userSchema)
export default User