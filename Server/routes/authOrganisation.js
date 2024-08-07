const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organisation = require('../models/Organisation');
const fetchOrganisation = require('../middleware/fetchOrganisation');

const router = express.Router();


// ROUTE 1: Register a Organisation : POST "/api/authOrganisation/register". NO login required.
router.post('/register', [
    // Validations Using express-validator.
    body('organisation_name', 'Enter a valid Name').exists(),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a 8 character password').isLength({ min: 8 })
], async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether organisation with this Email already exists.
        let organisation = await Organisation.findOne({ email: req.body.email });
        if (organisation) {
            return res.status(400).json({ error: "Organisation Already registered" })
        }

        // Hashing Password.
        const salt = await bcrypt.genSalt();
        securePassword = await bcrypt.hash(req.body.password, salt);
        // Adding organisation to the Database.
        organisation = await Organisation.create({
            organisation_name: req.body.organisation_name,
            organisation_type: req.body.organisation_type,
            government_id: req.body.government_id,
            email: req.body.email,
            address: req.body.address,
            password: securePassword
        })

        const data = {
            organisation: {
                id: organisation.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        console.log(authToken);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured!!!");
    }
})

// ROUTE 2: Login a organisation: POST "api/authOrganisation/login". NO login required.
router.post('/login', [
    body('email', 'Enter a value Email').isEmail(),
    body('password', 'Enter a value Email').exists()
], async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        toast.error('Enter Correct Credentials');
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let organisation = await Organisation.findOne({ email });
        if (!organisation) {
            return res.status(400).json({ error: "Email not Registered" });
        }

        const comparePassword = await bcrypt.compare(password, organisation.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        const data = {
            organisation: {
                id: organisation.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 3: Get loggedin organisation details: POST "api/authOrganisation/getOrganisation". Login required.
router.post('/getOrganisation', fetchOrganisation, async (req, res) => {
    try {
        organisationid = req.organisation.id;
        const organisation = await Organisation.findById(organisationid).select("-password");
        res.send(organisation);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;