import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js'; // Assuming you have middleware for JWT authentication

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/get/:userId', authenticateToken, getUserProfile); // Example of using JWT authentication middleware
userRoutes.put('/update/:userId', authenticateToken, updateUserProfile);
userRoutes.delete('/deleteById/:userId', authenticateToken, deleteUserAccount);

export default userRoutes;