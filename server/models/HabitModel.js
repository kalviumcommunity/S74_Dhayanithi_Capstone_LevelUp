import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "daily"
    },
    targetPerDay: {
        type: Number,
        default: 1
    },
    completedToday: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    lastCompleted: {
        type: Date,
        default: null
    },
    lastCheckedDate: {
        type: Date,
        default: null
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    missedCount: {
        type: Number,
        default: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    badge: {
        type: String,
        enum: ["none", "bronze", "silver", "gold"],
        default: "none"
    },
    history: [
        {
            date: { type: String }, // Format: YYYY-MM-DD
            completedCount: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

const habitModel = mongoose.model("Habit", habitSchema);
export default habitModel;
