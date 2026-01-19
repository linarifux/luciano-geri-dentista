import express from 'express';
const router = express.Router();
import { 
  createAppointment, 
  deleteAppointment, 
  getAppointments, 
  getAvailableSlots, 
  updateAppointment
} from '../controllers/appointmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// @route   GET /api/appointments/slots
// @desc    Get available time slots for a specific date
// @access  Public
router.get('/slots', getAvailableSlots);

router.route('/')
  // @route   POST /api/appointments
  // @desc    Create a new appointment
  // @access  Public
  .post(createAppointment)
  
  // @route   GET /api/appointments
  // @desc    Get all appointments (Admin only)
  // @access  Private/Admin
  .get(protect, admin, getAppointments);


// Add these lines for Update/Delete by ID
router.route('/:id')
  .put(protect, admin, updateAppointment)
  .delete(protect, admin, deleteAppointment);


export default router;