import asyncHandler from '../middleware/asyncHandler.js';
import Appointment from '../models/appointmentModel.js';

// --- Configuration ---
const WORK_START = "09:00";
const WORK_END = "19:00";
const SLOT_DURATION = 30; // 30 Minutes slots for more flexibility

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

  if (!date) return res.json([]);

  // 1. Generate all possible slots for the day
  const allSlots = generateSlots(WORK_START, WORK_END, SLOT_DURATION);

  // 2. Define the time range for the selected date
  const startOfDay = new Date(date); 
  startOfDay.setHours(0,0,0,0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23,59,59,999);

  // 3. Find existing appointments (excluding cancelled ones)
  const existingAppointments = await Appointment.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: 'Cancelled' } 
  }).select('time');

  // 4. Filter out booked times
  const bookedTimes = existingAppointments.map((app) => app.time);
  const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

  res.json(availableSlots);
});

// @desc    Get appointments (Role-Based Access)
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  const { date, doctor, status } = req.query;
  let query = {};

  // --- 1. SECURITY: Role-Based Filtering ---
  // If user is a Doctor, they can ONLY see their own appointments
  if (req.user.role === 'doctor') {
    query.doctor = req.user.name; 
  } 
  // If user is Admin, they can see all, or filter by specific doctor
  else if (req.user.role === 'admin' && doctor) {
    query.doctor = doctor;
  }

  // --- 2. Date Filter ---
  if (date === 'today') {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    query.date = { $gte: startOfDay, $lte: endOfDay };
  } else if (date) {
    const searchDate = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(searchDate.getDate() + 1);
    query.date = { $gte: searchDate, $lt: nextDay };
  }

  // --- 3. Status Filter ---
  if (status && status !== 'All') {
    query.status = status;
  }

  const appointments = await Appointment.find(query).sort({ date: 1, time: 1 });
  res.json(appointments);
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, phone, service, doctor, date, time, message } = req.body;

  if (!name || !date || !time || !service) {
    res.status(400);
    throw new Error('Compila tutti i campi obbligatori');
  }

  // Check for double booking (Optional but recommended)
  const appointmentDate = new Date(date);
  const existingAppt = await Appointment.findOne({
    date: appointmentDate,
    time: time,
    status: { $ne: 'Cancelled' }
  });

  if (existingAppt) {
    res.status(400);
    throw new Error('Orario non disponibile.');
  }

  const appointment = new Appointment({
    name,
    email,
    phone,
    service,
    doctor, 
    date,
    time,
    message,
    status: 'Pending'
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.name = req.body.name || appointment.name;
    appointment.email = req.body.email || appointment.email;
    appointment.phone = req.body.phone || appointment.phone;
    appointment.service = req.body.service || appointment.service;
    appointment.doctor = req.body.doctor || appointment.doctor; // Allow reassigning doctor
    appointment.message = req.body.message || appointment.message;
    appointment.status = req.body.status || appointment.status;

    if (req.body.date) appointment.date = new Date(req.body.date);
    if (req.body.time) appointment.time = req.body.time;

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
  getAvailableSlots, // Exporting as getSlots to match routes
  updateAppointment, 
  deleteAppointment  
};