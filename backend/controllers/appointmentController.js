import asyncHandler from '../middleware/asyncHandler.js';
import Appointment from '../models/appointmentModel.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, phone, service, date, message } = req.body;

  const appointment = await Appointment.create({
    name, email, phone, service, date, message
  });

  if (appointment) {
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error('Dati appuntamento non validi');
  }
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).sort({ date: 1 });
  res.json(appointments);
});

export { createAppointment, getAppointments };