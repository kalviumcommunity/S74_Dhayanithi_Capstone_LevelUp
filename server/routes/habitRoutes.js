
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


habitRouter.post('/create', protect, createHabit);

habitRouter.put('/update/:habitId', protect, updateHabit);

habitRouter.delete('/delete/:habitId', protect, deleteHabit);

habitRouter.put('/archive/:habitId', protect, archiveHabit);

habitRouter.put('/complete/:habitId', protect, markHabitComplete);

habitRouter.get('/total-streak', protect, getTotalStreak);

habitRouter.get('/all-habits', protect, getAllHabits);

habitRouter.put('/daily-reset', protect, dailyResetHabits);

habitRouter.get('/category/:category', protect, getHabitsByCategory);

habitRouter.get('/time/:timeOfDay', protect, getHabitsByTime);

export default habitRouter;