import express from 'express';
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



let router = express.Router();

//sign up
router.post('/register',async (req, res) => {
    
    try {
        const { name, email, password } = req.body;

        const dbUser = await User.findOne({ email: email });

        if (dbUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        await user.save();
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'cannot register' });
    }
}
);


//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'cannot login' });
    }
});

export default router;