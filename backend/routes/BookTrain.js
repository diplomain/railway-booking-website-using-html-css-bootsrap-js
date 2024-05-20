import express from 'express';
import { bookTrainTicket } from '../Controllers/BookTrain.js';

const router = express.Router();

// Route to book a train ticket
router.post('/book-ticket', bookTrainTicket);

export default router;
