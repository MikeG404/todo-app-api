import mongoose from "mongoose";

export const connectDB = () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/TODO-APP';
    
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connect to Mongo successful"); 
        })
        .catch((error) => {
            throw new Error(error.message);
        })
}
