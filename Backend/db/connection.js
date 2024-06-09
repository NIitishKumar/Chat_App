import mongoose from "mongoose";

const connectMongoDB = async () => {
    console.log("----------------", process.env.MONGO_CONNECTION_STRING)
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;