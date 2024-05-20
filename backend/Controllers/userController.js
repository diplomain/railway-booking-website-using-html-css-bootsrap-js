import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Function to register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      connection.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ message: 'Registration failed. Please try again later.' });
        }
        res.json({ message: 'User registered successfully!', insertId: result.insertId });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
  };
// Function to authenticate a user and generate JWT token
export const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the user exists
    const selectQuery = "SELECT * FROM users WHERE username = ?";
    db.query(selectQuery, [username], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Check if the password is correct
        const isValidPassword = bcrypt.compareSync(password, result[0].password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: result[0].id }, "your_secret_key", { expiresIn: "1h" });
        return res.status(200).json({ token, message: "Login successful" });
    });
};

/// Function to get user profile
export const getUserProfile = (req, res) => {
    const userId = req.user.id; // Assuming you have middleware to extract userId from JWT
    console.log("User ID:", userId); // Log the extracted userId for debugging

    // Query the database to get user profile data
    const selectQuery = "SELECT * FROM users WHERE id = ?";
    db.query(selectQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Query result:", result); // Log the query result for debugging

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const userProfile = {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            name: result[0].name
        };
        return res.status(200).json(userProfile);
    });
};


// Function to update user profile
export const updateUserProfile = (req, res) => {
    const userId = req.user.id; // Assuming you have middleware to extract userId from JWT
    const { username, email, name } = req.body;

    // Update user data in the database
    const updateQuery = "UPDATE users SET username = ?, email = ?, name = ? WHERE id = ?";
    db.query(updateQuery, [username, email, name, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "User profile updated successfully" });
    });
};

// Function to delete user account
export const deleteUserAccount = (req, res) => {
    const userId = req.user.id; // Assuming you have middleware to extract userId from JWT

    // Delete user data from the database
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "User account deleted successfully" });
    });
};
