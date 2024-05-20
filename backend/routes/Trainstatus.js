import express from 'express';
import { checkTrainStatus } from '../Controllers/TrainStatusController.js';

const router = express.Router();

// Route to check the status of a train
router.get('/train-status/:trainId', checkTrainStatus);

export default router;
