import express from 'express';
const router = express.Router();
import { createAppointment, getAppointments } from '../controllers/appointmentController.js';

router.route('/')
  .post(createAppointment)
  .get(getAppointments); // In a real app, add auth middleware here

export default router;