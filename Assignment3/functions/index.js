// index.js (Firebase Functions )
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mailgun = require("mailgun-js");

const DOMAIN = "sandbox57739761967546b6b7c44c673bbcde81.mailgun.org";
const mg = mailgun({
  apiKey: "a06a57126389adf4e66a242dc72320fd-d010bdaf-d6e2ec77",
  domain: DOMAIN,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.post("/email/login", (req, res) => {
  const to_email = req.body.to_email;

  if (!to_email) {
    return res.status(400).send("Recipient email is required.");
  }

  const emailData = {
    from: `Mailgun Sandbox <postmaster@${DOMAIN}>`,
    to: to_email,
    subject: "Welcome!",
    text: "Welcome back to our service!",
  };

  mg.messages().send(emailData, (error, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to send email.");
    }

    return res.status(200).send(`Email successfully sent to ${to_email}`);
  });
});

exports.api = functions.https.onRequest(app);
