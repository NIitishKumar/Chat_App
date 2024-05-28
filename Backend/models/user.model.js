import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    userName: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        min:8
    },
    gender: {
        type: String,
        required:true,
        enum : ["male", "female"]
    },
    profilePic: {
        type: String,
        default:""
    },
})

const User  = mongoose.model("Person", userSchema);
export default  User;