import asyncHandler from '../middleware/asyncHandler.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import Service from '../models/serviceModel.js';

// --- STATS & DASHBOARD ---

// @desc    Get Dashboard Statistics
// @route   GET /api/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const pendingCount = await Appointment.countDocuments({ status: 'In attesa' });
  
  // Get unique patient emails
  const uniqueEmails = await Appointment.distinct('email');
  const totalPatients = uniqueEmails.length;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const appointmentsToday = await Appointment.countDocuments({ 
    date: { $gte: todayStart } 
  });

  res.json({ pendingCount, totalPatients, appointmentsToday });
});

// --- PATIENT MANAGEMENT ---

// @desc    Get all patients (unique by email)
// @route   GET /api/admin/patients
export const getPatients = asyncHandler(async (req, res) => {
  // Aggregation to find unique patients and their last visit
  const patients = await Appointment.aggregate([
    {
      $group: {
        _id: "$email",
        name: { $first: "$name" },
        phone: { $first: "$phone" },
        lastAppointment: { $max: "$date" },
        visitCount: { $sum: 1 }
      }
    },
    { $sort: { lastAppointment: -1 } }
  ]);
  res.json(patients);
});

// --- STAFF / DOCTOR MANAGEMENT ---

// @desc    Get all staff members
// @route   GET /api/admin/staff
export const getStaff = asyncHandler(async (req, res) => {
  const staff = await User.find({}).select('-password');
  res.json(staff);
});

// @desc    Delete a staff member
// @route   DELETE /api/admin/staff/:id
export const deleteStaff = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === 'admin') {
        res.status(400);
        throw new Error('Non è possibile eliminare l\'amministratore principale');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'Membro dello staff rimosso' });
  } else {
    res.status(404);
    throw new Error('Utente non trovato');
  }
});

// --- SERVICE MANAGEMENT ---

// @desc    Get all services
// @route   GET /api/admin/services
export const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// @desc    Add a new service
// @route   POST /api/admin/services
export const createService = asyncHandler(async (req, res) => {
  const { title, description, basePrice, duration } = req.body;
  const service = new Service({ title, description, basePrice, duration });
  const createdService = await service.save();
  res.status(201).json(createdService);
});

// --- APPOINTMENT STATUS ---

// @desc    Update Appointment Status
// @route   PUT /api/admin/appointments/:id
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.status = req.body.status || appointment.status;
    const updated = await appointment.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Appuntamento non trovato');
  }
});