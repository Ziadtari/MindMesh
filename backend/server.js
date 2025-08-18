const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
 
dotenv.config();
connectDB();
 
const app = express();
app.use(express.json()); // Parse JSON request body
 
// Routes
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));