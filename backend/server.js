import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security & Parsing
app.use(cors({
  origin: ['http://localhost:5173', 'https://luciano-geri-dentista.netlify.app', 'https://luciano-geri-dentista.vercel.app'], // Your Vite frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser()); // Parses cookies for auth

// index route
app.get('/', (req, res) => {
  res.send('API is Running...')
})

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Custom Error Middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold)
);