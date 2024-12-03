const express = require ('express');
const dotenv = require ('dotenv');
const db = require('./config/config-db');
const todoRoutes = require ('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/todos',todoRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});
