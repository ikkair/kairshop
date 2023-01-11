// Import environtment variable
require("dotenv").config();

// Import express library 
const express = require("express");
const app = express();

// Import cors
const cors = require("cors");
app.use(cors());

// // Import helmet
// const helmet = require("helmet");
// app.use(helmet);

// Import error response to unidentified path
const createError = require("http-errors");

// Port choice
const port = 4000;

// Import and use Main Router
const mainRouter = require("./src/router/index")
app.use("/", mainRouter);

// Calling error to unidentified path
app.all('*', (req, res, next) => {
    next(new createError.NotFound());
})

// Listening port awaiting requests
app.listen(port, ()=>{
    console.log(`Server run on port: ${port}`);
})



