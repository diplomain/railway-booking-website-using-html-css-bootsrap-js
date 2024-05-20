import { db } from "../connect.js";

// Function to add a new station
export const addStation = (req, res) => {
    const { name, location } = req.body;

    // Check if required fields are provided
    if (!name || !location) {
        return res.status(400).json({ error: "Please provide name and location for the station" });
    }

    // Insert the station into the database
    const insertQuery = "INSERT INTO stations (name, location) VALUES (?, ?)";
    db.query(insertQuery, [name, location], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(201).json({ message: "Station added successfully" });
    });
};

// Function to get station details by ID
export const getStationById = (req, res) => {
    const stationId = req.params.id;

    // Query the database to get station details
    const selectQuery = "SELECT * FROM stations WHERE id = ?";
    db.query(selectQuery, [stationId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Station not found" });
        }
        const stationDetails = {
            id: result[0].id,
            name: result[0].name,
            location: result[0].location
        };
        return res.status(200).json(stationDetails);
    });
};

// Function to update station details
export const updateStation = (req, res) => {
    const stationId = req.params.id;
    const { name, location } = req.body;

    // Update station data in the database
    const updateQuery = "UPDATE stations SET name = ?, location = ? WHERE id = ?";
    db.query(updateQuery, [name, location, stationId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Station updated successfully" });
    });
};

// Function to delete a station
export const deleteStation = (req, res) => {
    const stationId = req.params.id;

    // Delete the station from the database
    const deleteQuery = "DELETE FROM stations WHERE id = ?";
    db.query(deleteQuery, [stationId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Station deleted successfully" });
    });
};
