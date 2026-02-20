import mongoose from "mongoose";
//connect the Database
const db_connect =()=>{ mongoose.connect('mongodb://localhost:27017/facebook').then(
    (res)=>
    {
        console.log("database connected")
    }
)}
export default db_connect