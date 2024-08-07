const nodemailer = require("nodemailer");

const disease = "Malaria"
if(true){
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
             to: "darshilmarathe24@gmail.com, ", // list of receivers
             subject: "Urgent Appeal for Immediate Measures to Control the Spread of [Disease]✔",
             text: `In recent days, there has been a concerning surge in reported cases of the ${disease} disease in our system within our local area, with the total count now exceeding 3,000 patients. This alarming increase necessitates immediate action to curb its spread. We must remain vigilant and proactive in implementing measures to contain and mitigate the widespread outbreak. It is crucial for the community to come together and follow recommended guidelines to protect ourselves and others during this challenging time. We must prioritize safety and health as we navigate this situation.`, 
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