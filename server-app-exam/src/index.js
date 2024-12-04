const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectMongoDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const todoRoutes = require('../routes/todoRoutes');

dotenv.config();
connectMongoDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
