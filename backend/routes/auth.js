import express from 'express';
import { register,login,logout } from '../Controllers/auth.js';


const router = express.Router();

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// GET /auth/logout
router.get('/logout', logout);

export default router;
