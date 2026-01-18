import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs'; // Import bcrypt for manual hashing
import { users, services, appointments } from './data/dummyData.js';
import User from './models/userModel.js';
import Service from './models/serviceModel.js';
import Appointment from './models/appointmentModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Appointment.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    // Map through users to hash passwords manually for the seeder
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert Users with hashed passwords
    await User.insertMany(hashedUsers);
    
    // Insert Services
    await Service.insertMany(services);

    // Insert Appointments
    await Appointment.insertMany(appointments);

    console.log('Dati Importati con Successo!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Errore: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Appointment.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    console.log('Dati Distrutti!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Errore: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}