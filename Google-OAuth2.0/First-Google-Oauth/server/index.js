require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

// allow frontend and cookies
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// connect mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch(e => console.error(e));

// routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// test
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server on', PORT));
