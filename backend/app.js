import express from 'express';
import auth from './routes/auth.js';
import list from './routes/list.js';    
import connectDB from './connection/conn.js';
import dotenv from 'dotenv';
import authenticateToken from './middleware/authenticateToken.js';

dotenv.config();
let app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', auth);
app.use('/api/v1/list', authenticateToken, list);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});