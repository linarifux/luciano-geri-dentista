import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Il nome è obbligatorio'] 
    },
    email: { 
      type: String, 
      required: [true, "L'email è obbligatoria"] 
    },
    phone: { 
      type: String, 
      required: [true, 'Il numero di telefono è obbligatorio'] 
    },
    service: { 
      type: String, 
      required: true, 
      // STRICTLY MATCHES the dropdown in BookingForm.jsx and EditAppointmentModal.jsx
      enum: [
        'Igiene e Prevenzione', 
        'Controllo Generale', 
        'Ortodonzia', 
        'Estetica Dentale', 
        'Implantologia', 
        'Altro'
      ] 
    },
    date: { 
      type: Date, 
      required: true 
    },
    // REQUIRED: Stores the specific slot (e.g., "09:00")
    // This is critical for the "getAvailableSlots" logic to work
    time: { 
      type: String, 
      required: [true, "L'orario è obbligatorio"] 
    },
    message: { 
      type: String,
      default: '' // Ensures it returns an empty string instead of undefined if empty
    },
    status: { 
      type: String, 
      required: true, 
      default: 'Pending', 
      // Matches the status dropdown in EditAppointmentModal.jsx
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] 
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;