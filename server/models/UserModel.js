import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true  
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    phone: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;
