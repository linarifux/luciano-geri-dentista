import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Routes ---
// @desc    Auth user & get token
// @route   POST /api/users/login
router.post('/login', authUser);

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
router.post('/logout', logoutUser);

// --- Private Routes (Logged in users) ---
// @desc    Get user profile
// @route   GET /api/users/profile
router
  .route('/profile')
  .get(protect, getUserProfile);
  // You can add .put(protect, updateUserProfile) here if you implement it later

// --- Admin Routes ---
// @desc    Register a new user (Staff creation)
// @route   POST /api/users/register
// @access  Private/Admin (Only admins can create new accounts)
router
  .route('/register')
  .post(protect, admin, registerUser);

export default router;