const express = require('express');
const Camps = require('../models/Camps');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// ROUTE 1: Get all the camps data using : GET "api/camps/fetchallcamps". Login required.
router.get('/fetchallcamps', async (req, res) => {
    try {
        const camps = await Camps.find();
        res.json(camps);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})


module.exports = router;