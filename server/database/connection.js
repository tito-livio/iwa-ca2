import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

const URL = process.env.MONGO_URI;

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
export default connectDB;