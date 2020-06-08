// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

//to make it work you need gmail account
const nodemailerEmail = functions.config().nodemailer.login;
const nodemailerPassword = functions.config().nodemailer.pass;

admin.initializeApp();

//creating function for sending emails
var goMail = function (name, mailFrom, subject, meassage) {
  //transporter is a way to send your emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: nodemailerEmail,
      pass: nodemailerPassword,
    },
  });

  // setup email data with unicode symbols
  //this is how your email are going to look like
  const mailOptions = {
    from: "AutoVita BH <" + nodemailerEmail + ">", // sender address
    to: [
      "autovitabh@gmail.com",
      "mohd98.mm@gmail.com",
      "mudafaralmusaed97@gmail.com",
      "aboodikoo2@gmail.com",
      "Abdullaalsais1995@gmail.com",
      "Ahmedk.aa6@gmail.com",
    ], // list of receivers
    subject: subject, // Subject line
    text: "Name: " + name + "MailFrom: " + mailFrom + "Message: " + meassage, // plain text body
    html:
      "<h2>Subject: " +
      subject +
      "</br> <h3>Name: " +
      name +
      "</h3></br> <h3>MailFrom: " +
      mailFrom +
      "</h3></br> <p>" +
      meassage +
      "</p>", // html body
  };

  //this is callback function to return status to firebase console
  const getDeliveryStatus = function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };

  //call of this function send an email, and return status
  transporter.sendMail(mailOptions, getDeliveryStatus);
};

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database
  .ref("/emails/{sessionId}")
  .onCreate(function (snap, context) {
    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    var name = createdData.name;
    var mailFrom = createdData.mailFrom;
    var subject = createdData.subject;
    var message = createdData.message;

    //here we send new data using function for sending emails
    goMail(name, mailFrom, subject, message);
  });
