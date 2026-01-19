import express from 'express';
import { getBlogs, getBlogById, createBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js'; // Import the config

const router = express.Router();

router.route('/')
  .get(getBlogs)
  // Add 'upload.single' middleware to handle the 'image' field
  .post(protect, admin, upload.single('image'), createBlog);

router.route('/:id')
  .get(getBlogById)
  .delete(protect, admin, deleteBlog);

export default router;