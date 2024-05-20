import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded; // Set the decoded user information in the request object
        next(); // Proceed to the next middleware or route handler
    });
};
 