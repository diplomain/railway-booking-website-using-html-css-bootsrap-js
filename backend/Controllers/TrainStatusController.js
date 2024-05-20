import { db } from "../connect.js";

// Controller function to check the status of a train
export const checkTrainStatus = (req, res) => {
    const trainId = req.params.trainId;

    // Query the database to get train status
    const selectQuery = "SELECT * FROM train WHERE id = ?";
    db.query(selectQuery, [trainId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Train not found" });
        }

       // Assuming result contains the train details retrieved from the database
const trainStatus = {
    id: result[0].id,
    trainName: result[0].trainName,
    departureStation: result[0].departureStation,
    arrivalStation: result[0].arrivalStation,
     
    seatsAvailable: result[0].seatsAvailable,
    timestamp: result[0].timestamp
};

        return res.status(200).json(trainStatus);
    });
};
