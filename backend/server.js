const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mailRoutes = require('./routes/mailRoutes');
const nodemailer = require('nodemailer');


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/mail', mailRoutes); // This uses the proper controller


app.listen(5000, () => console.log('Server started on http://localhost:5000'));