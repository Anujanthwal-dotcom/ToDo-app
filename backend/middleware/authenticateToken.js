import jwt from 'jsonwebtoken';
import User from '../models/user.js';



const authenticateToken = (req, res, next) => {
    const authHeader=req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedEmail) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        
        const user = User.findOne({ email: decodedEmail.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; 
        next();
    });
}

export default authenticateToken;