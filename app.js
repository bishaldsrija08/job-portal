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
// Auth routes
const userRoutes = require("./routes/userRoutes")
app.use("/", userRoutes)

//  Job routes
const jobRoute = require("./routes/jobRoutes")
app.use("/", jobRoute)

// Application routes
const applicationRoutes = require("./routes/applicationRoutes")
app.use("/", applicationRoutes)






// Start the server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})