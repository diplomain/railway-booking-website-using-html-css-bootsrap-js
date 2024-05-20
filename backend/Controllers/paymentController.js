import { db } from "../connect.js";

// Controller function to make a payment
export const makePayment = (req, res) => {
    const { userId, amount, paymentMethod } = req.body;

    // Check if required fields are provided
    if (!userId || !amount || !paymentMethod) {
        return res.status(400).json({ error: "Please provide userId, amount, paymentMethod" });
    }

    // Perform the payment process (e.g., connect to payment gateway API, process payment, update database, etc.)
    // For demonstration purposes, we'll simulate a successful payment and update the database

    // Update the user's balance in the database
    const updateQuery = "UPDATE payments SET balance = balance - ? WHERE id = ?";
    db.query(updateQuery, [amount, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
    });
};
        // Insert payment record into the payments table
        export const Payment = (req, res) => {
            const { userId, amount, paymentMethod } = req.body;

    // Check if required fields are provided
    if (!userId || !amount || !paymentMethod) {
        return res.status(400).json({ error: "Please provide userId, amount, paymentMethod" });
    }
        const insertPaymentQuery = "INSERT INTO payments (userId, amount, paymentMethod) VALUES (?, ?, ?)";
        db.query(insertPaymentQuery, [userId, amount, paymentMethod ], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }
            return res.status(200).json({ message: "Payment successful" });
        });
    
};
