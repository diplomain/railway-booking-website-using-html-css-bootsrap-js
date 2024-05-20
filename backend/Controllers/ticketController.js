import { db } from "../connect.js";

export const bookTicket = (req, res) => {
    const { userId, departureStation, arrivalStation, departureTime, arrivalTime, price } = req.body;

    // Check if required fields are provided
    if (!userId || !departureStation || !arrivalStation || !departureTime || !arrivalTime || !price) {
        return res.status(400).json({ error: "Please provide all ticket details" });
    }

    // Implement the logic to book a ticket
    // For demonstration purposes, let's assume the ticket is booked successfully
    const ticketDetails = {
        id: 1, // This would typically come from the database after inserting the ticket record
        userId,
        departureStation,
        arrivalStation,
        departureTime,
        arrivalTime,
        price,
        status: 'Booked', // Assuming the initial status is 'Booked'
        timestamp: new Date().toISOString() // Timestamp of when the ticket was booked
    };

    return res.status(200).json({ message: "Ticket booked successfully", ticketDetails });
};
 

// Controller function to get ticket details
export const getTicketDetails = (req, res) => {
    const ticketId = req.params.ticketId;

    // Query the database to get ticket details
    const selectQuery = "SELECT * FROM tickets WHERE id = ?";
    db.query(selectQuery, [ticketId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Ticket not found" });
        }
       // Assuming result contains the ticket details retrieved from the database
const ticketDetails = {
    id: result[0].id,
    userId: result[0].userId,
    departureStation: result[0].departureStation,
    arrivalStation: result[0].arrivalStation,
    departureTime: result[0].departureTime,
    arrivalTime: result[0].arrivalTime,
    price: result[0].price,
    status: result[0].status,
    timestamp: result[0].timestamp
};

        return res.status(200).json(ticketDetails);
    });
};
