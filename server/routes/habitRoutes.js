import express from 'express';
import {
  createHabit,
  updateHabit,
  deleteHabit,
  archiveHabit,
  markHabitComplete,
  getTotalStreak,
  getAllHabits,
  dailyResetHabits,
  getHabitsByCategory,
  getHabitsByTime
} from '../controllers/habitController.js';

import { protect } from '../middlewares/authMiddleware.js'; // Protecting the routes with authentication

const habitRouter = express.Router();

// Create a new habit
habitRouter.post('/create', protect, createHabit);

// Update an existing habit
habitRouter.put('/update/:habitId', protect, updateHabit);

// Delete a habit
habitRouter.delete('/delete/:habitId', protect, deleteHabit);

// Archive a habit
habitRouter.put('/archive/:habitId', protect, archiveHabit);

// Mark a habit as completed (increment streak)
habitRouter.put('/complete/:habitId', protect, markHabitComplete);

// Get the total streak (average of all habit streaks)
habitRouter.get('/total-streak', protect, getTotalStreak);

// Get all habits
habitRouter.get('/all-habits', protect, getAllHabits);

// Daily reset for habits
habitRouter.put('/daily-reset', protect, dailyResetHabits);

// New routes for category and time filtering
habitRouter.get('/category/:category', protect, getHabitsByCategory);
habitRouter.get('/time/:timeOfDay', protect, getHabitsByTime);

export default habitRouter;