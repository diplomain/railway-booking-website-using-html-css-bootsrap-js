import { db } from "../connect.js";

// Controller function to cancel a train booking
export const cancelTrainBooking = (req, res) => {
    const id = req.params.id;

    // Delete the booking record from the database
    const deleteQuery = "DELETE FROM bookings WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking canceled successfully" });
    });
};

