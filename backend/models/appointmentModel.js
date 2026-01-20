import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // 1. Updated Enums to match Frontend Display Names exactly
    service: {
      type: String,
      required: true,
      enum: [
        "Igiene Dentale",
        "Visita di Controllo",
        "Visita Ortodontica",
        "Estetica Dentale",
        "Implantologia",
        "Altro",
        // Keeping old ones just in case to prevent breaking old records if strict
        "Igiene e Prevenzione",
        "Controllo Generale",
        "Ortodonzia",
      ],
    },
    doctor: {
      type: String, // Add this
      required: false,
    },

    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },

    // 3. Status Enum (Standardized)
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
