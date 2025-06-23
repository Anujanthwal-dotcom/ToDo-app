import jwt from 'jsonwebtoken';
import User from '../models/user.js';



const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET,(err, decodedEmail) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        try {
            User.findOne({ email: decodedEmail.email }).exec()
                .then((foundUser) => {
                    if (!foundUser) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    req.user = foundUser;
                    console.log("User found:", foundUser);
                    next();
                })
                .catch((error) => {
                    console.error("Error finding user:", error);
                    return res.status(500).json({ message: 'Internal server error' });
                });
        }
        catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }); 
    
    
}

export default authenticateToken;