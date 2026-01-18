import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Il nome è obbligatorio'] },
    email: { type: String, required: [true, 'L\'email è obbligatoria'] },
    phone: { type: String, required: [true, 'Il numero di telefono è obbligatorio'] },
    service: { 
      type: String, 
      required: true, 
      enum: ['Igiene', 'Controllo', 'Ortodonzia', 'Sbiancamento', 'Altro'] 
    },
    date: { type: Date, required: true },
    message: { type: String },
    status: { 
      type: String, 
      required: true, 
      default: 'In attesa', 
      enum: ['In attesa', 'Confermato', 'Annullato'] 
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;