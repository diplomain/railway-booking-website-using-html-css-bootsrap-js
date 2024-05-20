const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// MySQL Connection Setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'naveen',
  password: '123456',
  database: 'rail',
  port: '3307'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.post('/api/register', async (req, res) => {
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
});


// POST route for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to get the user with the provided email
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Login failed. Please try again later.' });
      }

      // Check if a user with the provided email exists
      if (result.length > 0) {
        const user = result[0];

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, login is successful
        if (isMatch) {
          res.json({ message: 'Login successful!', username: user.username });
        } else {
          // If passwords don't match, send an error response
          res.status(401).json({ message: 'Invalid email or password.' });
        }
      } else {
        // If no user found with the provided email, send an error response
        res.status(401).json({ message: 'Invalid email or password.' });
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
});
// GET route to fetch passengers data
app.get('/api/passengers', (req, res) => {
  // Implementation remains the same
});

// DELETE route for canceling a booking
app.delete('/api/bookings/:bookingId', (req, res) => {
  const bookingId = req.params.bookingId;

  // Delete booking from MySQL database
  const sql = 'DELETE FROM bookings WHERE id = ?';
  connection.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error canceling booking' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    console.log('Booking canceled successfully');
    res.status(200).json({ message: 'Booking canceled successfully' });
  });
});

 

 

 

app.post('/check-updates', (req, res) => {
  const { fromAddress, toAddress } = req.body;

  // Query the database for train updates based on from and to locations
  const sql = `SELECT * FROM train_schedule WHERE origin = ? AND destination = ?`;
  connection.query(sql, [fromAddress, toAddress], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching train updates');
    }
    res.json(result); // Send the train updates back to the client
  });
});
// GET route to fetch train data
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM train_schedule';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(result);
  });
});

// Route to handle payment data insertion
app.post('/api/processPayment', (req, res) => {
  const { cardNumber, expiryDate, cvv, billingAddress, amount } = req.body;

  // Insert payment data into MySQL database using prepared statements
  const sql = `INSERT INTO processPayment (cardNumber, expiryDate, cvv, billingAddress, amount)
               VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [cardNumber, expiryDate, cvv, billingAddress, amount], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error processing payment');
    }
    console.log('Payment data stored in database');
    res.status(200).send('Payment successful');
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).send('Server error');
});
app.post('/book', (req, res) => {
  const {
    departureStation,
    arrivalStation,
    category,
    price,
    departureTime,
    arrivalTime,
    passengerName,
    email,
    numTickets,
    seatNumber,
    trainNumber
  } = req.body;

  const sql = `INSERT INTO bookings 
               (departureStation, arrivalStation, category, price, departureTime, arrivalTime, passengerName, email, numTickets, seatNumber, trainNumber) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [departureStation, arrivalStation, category, price, departureTime, arrivalTime, passengerName, email, numTickets, seatNumber, trainNumber], (err, result) => {
    if (err) {
      console.error('Error adding booking to database:', err);
      res.status(500).send('Error adding booking to database');
      return;
    }

    const insertedId = result.insertId;
    console.log('Booking added to database. Booking ID:', insertedId);

     
  });
});

 // Assuming you have already set up your app and database connection

// Update email endpoint
app.put('/api/user', (req, res) => {
  const userId = req.userId; // Assuming you have middleware to extract user ID from the request
  const { newEmail } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Update user's email in the database
  db.query('UPDATE users SET email = ? WHERE id = ?', [newEmail, userId], (err, result) => {
    if (err) {
      console.error('Update email error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Email updated successfully' });
  });
});

 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
