// Import environtment variable
require("dotenv").config();

// Import
const mainRouter = require("./src/router/index"); // Import main router
const express = require("express"); // Import express library 
const helmet = require("helmet"); // Import helmet
const cors = require("cors"); // Import cors
const createError = require("http-errors"); // Import http error
const morgan = require("morgan"); // Import morgan
const xss = require("xss-clean") // Import xss
const app = express(); // Import express

// Use middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());

// Port choice
const port = process.env.PORT;

// use Main Router
app.use("/", mainRouter);

// Calling error to unidentified path
app.all('*', (req, res, next) => {
    next(new createError.NotFound());
})

// Error handling for html
app.use((err,req,res,next)=>{
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
      message : messageError
    });
})

// Listening port awaiting requests
app.listen(port, ()=>{
    console.log(`Server run on port: ${port}`);
})


// tambah handling error | clear
// Readme | clear
// table dilengkapi | ongoing
// export postman