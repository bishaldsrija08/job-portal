const express = require('express');
const app = express();

// Dotenv configuration
require('dotenv').config();

// Db connection
const { connectDB } = require('./database/dbConfig');
connectDB()










const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})