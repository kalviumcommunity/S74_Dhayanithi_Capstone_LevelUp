// routes/habitRoutes.js

import express from 'express';
import {
  createHabit,
  updateHabit,
  deleteHabit,
  archiveHabit,
  markHabitComplete,
  getTotalStreak,
  getAllHabits
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

// Mark a habit as completed (increment streak
habitRouter.put('/complete/:habitId', protect, markHabitComplete);

// Get the total streak (average of all habit streaks).
habitRouter.get('/total-streak', protect, getTotalStreak);

habitRouter.get('/all-habits',protect, getAllHabits)
export default habitRouter;
