import HabitModel from "../models/HabitModel.js";
import mongoose from "mongoose";


const getBadgeFromStreak = (streak) => {
    if (streak >= 50) return "gold";
    if (streak >= 30) return "silver";
    if (streak >= 10) return "bronze";
    return "none";
};


const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

// Create a new habit
export const createHabit = async (req, res) => {
    try {
        const {
            title,description,category,motivation,frequency,targetPerDay,preferredTime,startDate} = req.body;
        
        const userId = req.user._id;

        const newHabit = new HabitModel({
            userId,
            title,
            description,
            category,
            motivation,
            frequency,
            targetPerDay,
            preferredTime,
            startDate: startDate || Date.now(),
        });

        await newHabit.save();
        res.status(201).json({ message: "Habit created", habit: newHabit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create habit" });
    }
};


export const updateHabit = async (req, res) => {
    try { 
        const { habitId } = req.params;
        const updates = req.body;

        const habit = await HabitModel.findOneAndUpdate(
            { _id: habitId, userId: req.user._id },
            updates,
            { new: true }
        );

        if (!habit) return res.status(404).json({ message: "Habit not found" });
        res.status(200).json({ message: "Habit updated", habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update habit" });
    }
};


export const deleteHabit = async (req, res) => {
    try { 
        const { habitId } = req.params;

        const deletedHabit = await HabitModel.findOneAndDelete({
            _id: habitId,
            userId: req.user._id
        });

        if (!deletedHabit) return res.status(404).json({ message: "Habit not found" });
        res.status(200).json({ message: "Habit deleted", habit: deletedHabit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete habit" });
    }
};


export const archiveHabit = async (req, res) => {
    try {
        const { habitId } = req.params;
        const { unarchive = false } = req.body;

        const habit = await HabitModel.findOneAndUpdate(
            { _id: habitId, userId: req.user._id },
            { isArchived: !unarchive },
            { new: true }
        );

        if (!habit) return res.status(404).json({ message: "Habit not found" });
        res.status(200).json({
            message: unarchive ? "Habit unarchived" : "Habit archived",
            habit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update archive status" });
    }
};

// Mark a habit as completed (one click = one repetition)
export const markHabitComplete = async (req, res) => {
    try {
        const { habitId } = req.params;
        const userId = req.user._id;

        const habit = await HabitModel.findOne({ _id: habitId, userId });
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        const today = formatDate(new Date());
        const lastChecked = habit.lastCheckedDate ? formatDate(new Date(habit.lastCheckedDate)) : null;

        // Reset for new day then prevent over-completion and increment todays count then check 
        // daily goal met and updates history
        if (lastChecked && lastChecked !== today) {
            if (habit.completedToday < habit.targetPerDay) {
                habit.currentStreak = Math.max(habit.currentStreak - 5, 0);
                habit.missedCount++;
            }
            habit.completedToday = 0;
        }

        if (habit.completedToday >= habit.targetPerDay) {
            habit.lastCheckedDate = new Date();
            return res.status(200).json({ message: "Target already met for today", habit });
        }

        habit.completedToday++;

        if (habit.completedToday >= habit.targetPerDay) {
            habit.currentStreak++;
            habit.lastCompleted = new Date();
        }

        const historyEntry = habit.history.find(entry => entry.date === today);
        if (historyEntry) {
            historyEntry.completedCount++;
        } else {
            habit.history.push({ date: today, completedCount: 1 });
        }

        habit.lastCheckedDate = new Date();

        habit.badge = getBadgeFromStreak(habit.currentStreak);

        const progressPercentage = (habit.completedToday / habit.targetPerDay) * 100;

        await habit.save();

        res.status(200).json({
            message: "Habit updated",
            habit,
            progressPercentage: progressPercentage.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Daily reset for all habits (run via cron job)
export const dailyResetHabits = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = formatDate(new Date());

        const habits = await HabitModel.find({ userId });

        for (let habit of habits) {
            const lastChecked = habit.lastCheckedDate ? formatDate(new Date(habit.lastCheckedDate)) : null;

            if (lastChecked !== today) {
                // Apply penalty if yesterday's target wasn't met
                if (habit.completedToday < habit.targetPerDay) {
                    habit.currentStreak = Math.max(habit.currentStreak - 5, 0);
                    habit.missedCount++;
                }

                // Reset counters
                habit.completedToday = 0;
                habit.lastCheckedDate = new Date();
            }

            await habit.save();
        }

        res.status(200).json({ message: "Daily reset done successfully" });
    } catch (error) {
        console.error("Reset error:", error);
        res.status(500).json({ message: "Daily reset failed" });
    }
};

// Get total average streak across all habits
export const getTotalStreak = async (req, res) => {
    try {
        const userId = req.user._id;
        const habits = await HabitModel.find({ userId });

        if (habits.length === 0) {
            return res.status(200).json({ totalStreak: 0, averageProgress: 0 });
        }

        const totalStreak = habits.reduce((sum, h) => sum + h.currentStreak, 0);
        const averageStreak = Math.floor(totalStreak / habits.length);

        const totalProgress = habits.reduce((sum, h) => sum + (h.completedToday / h.targetPerDay), 0);
        const averageProgress = ((totalProgress / habits.length) * 100).toFixed(2);

        res.status(200).json({
            totalStreak: averageStreak,
            averageProgress
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch total streak" });
    }
};

// Get all habits
export const getAllHabits = async (req, res) => {
    try {
        const userId = req.user._id;
        const habits = await HabitModel.find({ userId });

        if (habits.length === 0) {
            return res.status(404).json({ message: "No habits found for this user" });
        }

        res.status(200).json({ message: "Habits retrieved successfully", habits });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch habits" });
    }
};

// Filter habits by category
export const getHabitsByCategory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { category } = req.params;

        const validCategories = ["health", "fitness", "learning", "productivity", "mindfulness", "social", "finance", "other"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const habits = await HabitModel.find({ userId, category });
        res.status(200).json({
            message: `Habits in ${category} category retrieved successfully`,
            habits,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch habits by category" });
    }
};

export const getHabitsByTime = async (req, res) => {
    try {
        const userId = req.user._id;
        const { timeOfDay } = req.params;

        const validTimes = ["morning", "afternoon", "evening", "anytime"];
        if (!validTimes.includes(timeOfDay)) {
            return res.status(400).json({ message: "Invalid time of day" });
        }

        const habits = await HabitModel.find({ userId, preferredTime: timeOfDay });
        res.status(200).json({
            message: `${timeOfDay} habits retrieved successfully`,
            habits,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch habits by time" });
    }
};