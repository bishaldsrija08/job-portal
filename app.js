const express = require('express');
const app = express();

// parse json data
app.use(express.json())

// Dotenv configuration
require('dotenv').config();

// Db connection
const { connectDB } = require('./database/dbConfig');
connectDB()

// Routes
const userRoutes = require("./routes/userRoutes")
app.use("/", userRoutes)









const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})