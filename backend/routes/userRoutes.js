import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.post('/login', authUser);
router.post('/logout', logoutUser);

// Private routes (require authentication)
router.route('/profile')
  .get(protect, getUserProfile);

// Admin only: Registering new staff members
router.post('/register', protect, admin, registerUser);

export default router;