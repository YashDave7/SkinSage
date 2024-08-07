const connectToMongoDB = require("./database");
const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');

// CONFIG .ENV FILE.
dotenv.config({path: __dirname+'/.env'});

// CONNECTION TO THE DATABASE.
connectToMongoDB();

// CREATING EXPRESS APP.
const app = express();
const port = 5000;

// MIDDLEWARES.
app.use(cors());
app.use(express.json());

// AVAILABLE ROUTES.
app.use('/api', require('./routes/imageUpload'));
app.use('/api/authUser', require('./routes/authUser'));
app.use('/api/authCamps', require('./routes/authCamps'));
app.use('/api/authOrganisation', require('./routes/authOrganisation'));
app.use('/api/camps', require('./routes/camps'));
app.use('/api/pay', require('./routes/payment'));


// RUNNING THE APPLICATION ON THE LOCALHOST PORT.
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});