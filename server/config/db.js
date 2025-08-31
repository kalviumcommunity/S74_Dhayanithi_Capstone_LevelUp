

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB Connected Successfully");
        return mongoose.connection;
    } catch (error) {
        console.log(" MongoDB Connection Error", error);
        throw error; 
    }
};