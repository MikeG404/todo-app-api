import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/TODO-APP')
        .then(() => {
            console.log("Connect to Mongo succesful"); 
        })
        .catch((error) => {
            throw new Error(error.message);
        })
}
