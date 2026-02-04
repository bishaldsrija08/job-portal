const express = require('express');
const app = express();

// parse json data
app.use(express.json())

// Dotenv configuration
require('dotenv').config();

// Db connection
const { connectDB } = require('./database/dbConfig');
connectDB()

// CORS configuration
const cors = require('cors');
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))

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

// User Profile routes
const userProfileRoutes = require("./routes/userProfileRoutes")
app.use("/", userProfileRoutes)

// Static folder for uploads
app.use("/uploads/", express.static("uploads"))





// Start the server
const port = process.env.PORT
app.listen(port, () => {
    require('./adminSeed')();
    console.log(`Server is running on port ${port}.`);
})