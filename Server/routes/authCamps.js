const express = require('express');
const Camps = require('../models/Camps');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchOrganisation = require('../middleware/fetchOrganisation');

const router = express.Router();

// ROUTE 1: Create a Camp registration using: POST "/api/authCamps/createcamp". login required.
router.post('/createcamp', fetchOrganisation, async (req, res) => {
    try {
        
        // Adding user to the Database.

        const camp = await Camps.create({
            organisation_name: req.organisation.organisation_name,
            email: req.body.email,
            mobile: req.body.mobile,
            location: req.body.location,
            speciality: req.body.speciality,
            date_of_camp: req.body.date_of_camp,
            details: req.body.details,
            payment: req.body.payment
        })
        // const camps = new Camps({
        //     organisation_name: req.organisation._id,
        //     email: req.body.email,
        //     mobile: req.body.mobile,
        //     location: req.body.location,
        //     speciality: req.body.speciality,
        //     date_of_camp: req.body.date_of_camp,
        //     details: req.body.details,
        //     payment: req.body.payment
        // })
        
        const savecamp = await camp.save();
        console.log(camp);
        res.status(200).json(camp)
            

        // const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // console.log(authToken);
        // res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured!!!");
    }
})


module.exports = router;