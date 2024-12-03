const express = require ('express');
const dotenv = require ('dotenv');
const db = require('./config/config-db');
const todoRoutes = require ('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
dotenv.config();