import express from 'express';
import { makePayment } from '../Controllers/paymentController.js';
import { Payment } from '../Controllers/paymentController.js';
const router = express.Router();

// Route to make a payment
router.put('/make-payment', makePayment);
router.post('/payment', Payment);

export default router;
