import express from 'express';
import { cancelTrainBooking } from '../Controllers/cancelTrainBooking.js';

const router = express.Router();

// Route to cancel a train booking
router.delete('/cancel-booking/:id', cancelTrainBooking);

export default router;
