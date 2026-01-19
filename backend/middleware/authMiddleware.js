import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // 1. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 2. Fetch the user from DB (exclude password)
      req.user = await User.findById(decoded.userId).select('-password');

      // 3. Check if user still exists (Edge case: User deleted but token valid)
      if (!req.user) {
        res.status(401);
        throw new Error('Accesso negato, utente non trovato');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Accesso negato, token non valido');
    }
  } else {
    res.status(401);
    throw new Error('Accesso negato, nessun token');
  }
});

// Admin-only middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403); // 403 Forbidden
    throw new Error('Accesso negato, area riservata all’amministratore');
  }
};

export { protect, admin };