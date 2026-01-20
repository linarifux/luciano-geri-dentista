import asyncHandler from '../middleware/asyncHandler.js';
import Appointment from '../models/appointmentModel.js';

// --- Configuration ---
const WORK_START = "09:00";
const WORK_END = "19:00";
const SLOT_DURATION = 60; // Minutes

// --- Helper: Generate HH:mm Slots ---
const generateSlots = (startStr, endStr, durationMinutes) => {
  const slots = [];
  let current = new Date(`2000-01-01T${startStr}:00`);
  const end = new Date(`2000-01-01T${endStr}:00`);

  while (current < end) {
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + durationMinutes);
  }
  return slots;
};

// @desc    Get available time slots for a specific date
// @route   GET /api/appointments/slots
// @access  Public
const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date } = req.query; 

  if (!date) {
    res.status(400);
    throw new Error('Data richiesta (formato YYYY-MM-DD)');
  }

  const allSlots = generateSlots(WORK_START, WORK_END, SLOT_DURATION);

  const startOfDay = new Date(date); 
  startOfDay.setUTCHours(0,0,0,0);
  
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23,59,59,999);

  const existingAppointments = await Appointment.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: 'Cancelled' } 
  }).select('time');

  const bookedTimes = existingAppointments.map((app) => app.time);
  const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

  res.json(availableSlots);
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
  // Destructure 'doctor' from body
  const { name, email, phone, service, doctor, date, time, message } = req.body;

  if (!name || !date || !time || !service) {
    res.status(400);
    throw new Error('Compila tutti i campi obbligatori');
  }

  const appointment = new Appointment({
    name,
    email,
    phone,
    service,
    doctor, // Save doctor directly to DB
    date,
    time,
    message,
    status: 'Pending'
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});
// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).sort({ date: 1, time: 1 });
  res.json(appointments);
});

// @desc    Update appointment (Status or Details)
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    // Update fields if they exist in the request body
    appointment.name = req.body.name || appointment.name;
    appointment.email = req.body.email || appointment.email;
    appointment.phone = req.body.phone || appointment.phone;
    appointment.service = req.body.service || appointment.service;
    appointment.message = req.body.message || appointment.message;
    
    // Status update (e.g., Pending -> Confirmed)
    appointment.status = req.body.status || appointment.status;

    // Rescheduling Logic (Date/Time change)
    if (req.body.date) {
      appointment.date = new Date(req.body.date);
    }
    if (req.body.time) {
      appointment.time = req.body.time;
      // Note: Admin overrides double-booking checks here. 
      // If you want to prevent Admin conflicts, copy the check logic from createAppointment here.
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appuntamento non trovato');
  }
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await appointment.deleteOne();
    res.json({ message: 'Appuntamento rimosso correttamente' });
  } else {
    res.status(404);
    throw new Error('Appuntamento non trovato');
  }
});

export { 
  createAppointment, 
  getAppointments, 
  getAvailableSlots,
  updateAppointment, 
  deleteAppointment  
};