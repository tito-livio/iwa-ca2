/**
 * @author: Tito Livio - 2018253
 * @description: This file is responsible to connect into the database.
 */

//importing the mongoose module
import mongoose from "mongoose";
//importing the dotenv module
import dotenv from "dotenv";
//setting a global variable filename from env engine to be used at the credential from atlas MongoDB
dotenv.config({ path: ".env" });

// getting the credential from a global variable to connect to MongoDB from the file .env
const URL = process.env.MONGO_URI;

//function to connect to MongoDB passing the URL
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

//making the function available globally
export default connectDB;