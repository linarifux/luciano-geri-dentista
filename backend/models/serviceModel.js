import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Igiene Orale"
  description: { type: String },
  basePrice: { type: Number },
  duration: { type: Number }, // in minutes
  isActive: { type: Boolean, default: true }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;