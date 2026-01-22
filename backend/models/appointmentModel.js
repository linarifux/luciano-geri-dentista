import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    service: {
      type: String,
      required: true,
      enum: [
        'Igiene Dentale',
        'Visita di Controllo',
        'Visita Ortodontica',
        'Estetica Dentale',
        'Implantologia',
        'Altro',
        // Legacy support
        'Igiene e Prevenzione',
        'Controllo Generale',
        'Ortodonzia'
      ],
    },
    
    doctor: {
      type: String, 
      required: false, // Optional for generic bookings
    },

    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;