import { db } from "../connect.js";

// Controller function to book a train ticket
export const bookTrainTicket = (req, res) => {
    const { userId, trainId, numberOfTickets } = req.body;

    // Check if userId, trainId, and numberOfTickets are provided
    if (!userId || !trainId || !numberOfTickets) {
        return res.status(400).json({ error: "Please provide userId, trainId, and numberOfTickets" });
    }

    // Check if the user and train exist in the database
    const checkUserQuery = "SELECT * FROM users WHERE id = ?";
    const checkTrainQuery = "SELECT * FROM trains WHERE id = ?";
    db.query(checkUserQuery, [userId], (errUser, userData) => {
        if (errUser) return res.status(500).json({ error: "Database error" });
        if (userData.length === 0) return res.status(404).json({ error: "User not found" });

        db.query(checkTrainQuery, [trainId], (errTrain, trainData) => {
            if (errTrain) return res.status(500).json({ error: "Database error" });
            if (trainData.length === 0) return res.status(404).json({ error: "Train not found" });

            const availableSeats = trainData[0].seats_available;
            const bookedSeats = trainData[0].seats_booked;

            // Check if enough seats are available
            if (availableSeats < numberOfTickets) {
                return res.status(400).json({ error: "Not enough seats available" });
            }

            // Update seats_available and seats_booked in the trains table
            const updatedSeatsAvailable = availableSeats - numberOfTickets;
            const updatedSeatsBooked = bookedSeats + numberOfTickets;
            const updateTrainQuery = "UPDATE trains SET seats_available = ?, seats_booked = ? WHERE id = ?";
            db.query(updateTrainQuery, [updatedSeatsAvailable, updatedSeatsBooked, trainId], (errUpdate) => {
                if (errUpdate) return res.status(500).json({ error: "Database error" });

                // Insert booking record into bookings table
                const insertBookingQuery = "INSERT INTO bookings (user_id, train_id, number_of_tickets) VALUES (?, ?, ?)";
                db.query(insertBookingQuery, [userId, trainId, numberOfTickets], (errInsert) => {
                    if (errInsert) return res.status(500).json({ error: "Database error" });

                    return res.status(200).json({ message: "Ticket booked successfully" });
                });
            });
        });
    });
};
