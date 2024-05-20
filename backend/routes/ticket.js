import express from 'express';
import { bookTicket,  getTicketDetails } from '../Controllers/ticketController.js'; // Updated import path

const router = express.Router();

// Route to book a ticket
router.post('/book-ticket', bookTicket);

// Route to get ticket details
router.get('/ticket-details/:ticketId', getTicketDetails);

export default router;
