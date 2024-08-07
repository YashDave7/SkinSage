const express = require('express');
const Diseases = require('../models/Diseases');
// const fetchUser = require('../middleware/fetchUser');
const nodemailer = require("nodemailer");



const router = express.Router();


// Route 1: Update count of diseases at a location or create new entry in database using: post "api/predictDisease". 
// Login required by user (will add middleware after creating lgoin/ signup)
router.post('/predictDisease', async (req, res) => {
    const { disease, location } = req.body;

    // Find the disease and location to be updated and update it.
    let diseaseLocation = await Diseases.findOne({ 'disease': req.body.disease, 'location': req.body.location });
    if (!diseaseLocation) {
        
        // return res.status(404).send("No entry for this disease at this location");
        try {
            // count = 1;
            const prediction = new Diseases({
                // locations: [{location: req.body.city, count: Diseases.count + 1}]
                disease, location, count: 1
            })
            const saveDisease = await prediction.save();
            res.json(saveDisease);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured");
        }
    }
    else {
        try {
            const dis_id = diseaseLocation._id;
            // Create a newDisease object. 
            const newDiseaseCount = {};
            if (disease) { newDiseaseCount.disease = disease };
            if (location) { newDiseaseCount.location = location };
            newDiseaseCount.count = Number(diseaseLocation.count) + 1;

            if(newDiseaseCount.count >10){
                const disease1 = "acne";
                console.log("Sending Alert Mail")
                const transporter = nodemailer.createTransport({
                   service:"Gmail",
                   auth: {
                      user: "davidherealways@gmail.com",
                      pass: "atam szmm igzv iylo",
                   },
                   });
                   
                   const options = {
                         from: 'davidherealways@gmail.com',
                         to: "darshilmarathe24@gmail.com, yashdave307@gmail.com", // list of receivers
                         subject: "Urgent Appeal for Immediate Measures to Control the Spread of [Disease]✔",
                         text: `In recent days, there has been a concerning surge in reported cases of the ${disease1} disease in our system within our local area, with the total count now exceeding 3,000 patients. This alarming increase necessitates immediate action to curb its spread. We must remain vigilant and proactive in implementing measures to contain and mitigate the widespread outbreak. It is crucial for the community to come together and follow recommended guidelines to protect ourselves and others during this challenging time. We must prioritize safety and health as we navigate this situation.`, 
                         // template: 'email.handlebars',
                         // template: 'email.handlebars',
                         // context: {
                         //    subject: 'Phishing Website Alert',
                         //    body: ``,
                         //    year: 2023,
                         //    name: 'Team PhishNet'
                         // }
                         };
                   
                   transporter.sendMail(options,function(err,info){
                      if(err){
                         console.log(err);
                         return;
                      }
                      console.log("SENT : " + info.response);
                   })
            
            }

            dis = await Diseases.findByIdAndUpdate(dis_id, { $set: newDiseaseCount }, { new: true });
            res.json({ dis });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured");
        }
    }
})



module.exports = router;