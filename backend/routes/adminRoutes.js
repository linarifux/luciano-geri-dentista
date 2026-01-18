import express from 'express';
const router = express.Router();
import { 
  getStats, 
  getPatients, 
  getStaff, 
  deleteStaff,
  getAllServices,
  createService,
  updateAppointmentStatus 
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// All routes here are protected and require Admin/Staff privileges
router.use(protect);

router.get('/stats', getStats);
router.get('/patients', getPatients);
router.route('/staff')
  .get(getStaff);
router.delete('/staff/:id', deleteStaff);

router.route('/services')
  .get(getAllServices)
  .post(createService);

router.put('/appointments/:id/status', updateAppointmentStatus);

export default router;