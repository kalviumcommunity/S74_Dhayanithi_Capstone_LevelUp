// controllers/habitController.js

import HabitModel from "../models/HabitModel.js";
import mongoose from "mongoose";

// Helper function to assign badge based on streak
const getBadgeFromStreak = (streak) => {
    if (streak >= 50) return "gold";
    if (streak >= 30) return "silver";
    if (streak >= 10) return "bronze";
    return "none";
};

// Create a new habit
export const createHabit = async (req, res) => {
    try {
        const { title, description, frequency, targetPerDay } = req.body;
        const userId = req.user._id;

        const newHabit = new HabitModel({
            userId,
            title,
            description,
            frequency,
            targetPerDay,
        });

        await newHabit.save();
        res.status(201).json({ message: "Habit created", habit: newHabit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create habit" });
    }
};

// Update a habit
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

// Delete a habit
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

// Archive a habit
export const archiveHabit = async (req, res) => {
    try {
        const { habitId } = req.params;

        const habit = await HabitModel.findOneAndUpdate(
            { _id: habitId, userId: req.user._id },
            { isArchived: true },
            { new: true }
        );

        if (!habit) return res.status(404).json({ message: "Habit not found" });

        res.status(200).json({ message: "Habit archived", habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to archive habit" });
    }
};

// Mark a habit as completed (one click = one repetition)
export const markHabitComplete = async (req, res) => {
    try {
        const { habitId } = req.params;
        const userId = req.user._id; // Coming from auth middleware

        const habit = await HabitModel.findOne({ _id: habitId, userId });
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        const today = new Date().toISOString().split('T')[0];
        const lastChecked = habit.lastCheckedDate ? new Date(habit.lastCheckedDate).toISOString().split('T')[0] : null;

        // Check if it's a new day to reset completedToday counter
        if (lastChecked && lastChecked !== today) {
            if (habit.completedToday < habit.targetPerDay) {
                habit.currentStreak = Math.max(habit.currentStreak - 5, 0);
                habit.missedCount++;
            }
            habit.completedToday = 0;
        }

        // Prevent over-completion
        if (habit.completedToday >= habit.targetPerDay) {
            habit.lastCheckedDate = new Date();
            return res.status(200).json({ message: "Target already met for today", habit });
        }

        // Mark one repetition done
        habit.completedToday++;

        // If target met, update streak and lastCompleted
        if (habit.completedToday >= habit.targetPerDay) {
            habit.currentStreak++;
            habit.lastCompleted = new Date();
        }

        // Push today's progress into history
        const historyTodayIndex = habit.history.findIndex(entry => entry.date === today);
        if (historyTodayIndex !== -1) {
            habit.history[historyTodayIndex].completedCount++;
        } else {
            habit.history.push({ date: today, completedCount: 1 });
        }

        habit.lastCheckedDate = new Date();

        // Update badge
        habit.badge = getBadgeFromStreak(habit.currentStreak);

        // Calculate progress percentage
        const progressPercentage = (habit.completedToday / habit.targetPerDay) * 100;

        await habit.save();
        res.status(200).json({
            message: "Habit updated",
            habit,
            progressPercentage: progressPercentage.toFixed(2)  // Adding the progress percentage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


// Get total streak (average of all habit streaks)
export const getTotalStreak = async (req, res) => {
    try {
        const userId = req.user._id;
        const habits = await HabitModel.find({ userId });

        if (habits.length === 0) return res.status(200).json({ totalStreak: 0 });

        const totalStreak = habits.reduce((sum, h) => sum + h.currentStreak, 0);
        const averageStreak = Math.floor(totalStreak / habits.length);

        // Calculate overall progress (average of all habit progress)
        const totalProgress = habits.reduce((sum, h) => sum + (h.completedToday / h.targetPerDay), 0);
        const averageProgress = (totalProgress / habits.length) * 100;

        res.status(200).json({
            totalStreak: averageStreak,
            averageProgress: averageProgress.toFixed(2) // Percentage progress across all habits
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch total streak" });
    }
};

// Get all habits of a particular user
export const getAllHabits = async (req, res) => {
    try {
        const userId = req.user._id;  // Extract userId from the authenticated user

        // Fetch all habits for the user from the database
        const habits = await HabitModel.find({ userId });

        // If no habits found, return a message indicating that
        if (habits.length === 0) {
            return res.status(404).json({ message: "No habits found for this user" });
        }

        // Return the list of habits
        res.status(200).json({
            message: "Habits retrieved successfully",
            habits,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch habits" });
    }
};




