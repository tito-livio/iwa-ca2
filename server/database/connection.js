/**
 * @author: Tito Livio - 2018253
 */

//importing the mongoose module 
import mongoose from 'mongoose';
//importing the dotenv module
import dotenv from 'dotenv';
//setting a global variable filename to env engine to be used just in this file
dotenv.config({ path: '.env' });

// setting a global variable to connect to MongoDB
const URL = process.env.MONGO_URI;

//function to connect to MongoDB passing the URL
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

//making the function available globally
export default connectDB;