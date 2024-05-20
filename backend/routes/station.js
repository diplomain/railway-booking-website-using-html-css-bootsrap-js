import express from 'express';
import { addStation, getStationById, updateStation, deleteStation } from '../Controllers/station.js';

const router = express.Router();

// Route to add a new station
router.post('/post', addStation);

// Route to get station details by ID
router.get('/get/:id', getStationById);

// Route to update station details
router.put('/update/:id', updateStation);

// Route to delete a station
router.delete('/delete/:id', deleteStation);

export default router;
