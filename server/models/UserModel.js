import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true  // Ensures userId is unique
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensures email is unique
    },
    phone: {
        type: String,
        required: true,
        unique: true  // Ensures phone is unique
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;
