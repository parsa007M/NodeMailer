// ! 1- Reuqirements : ------------------------------------------

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;

// ! 2- Settings : ------------------------------------------

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ! 3- Show Home Page : ------------------------------------------

app.get("/", (req, res) => {
  res.render("index");
});

// ! 4- Post Email : ------------------------------------------

app.post("/send", (req, res) => {
  let output = `
    <h1>New Email</h1>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>

  `;
});

// ! 5- NodeMailer : ------------------------------------------

// create reusable transporter object using the default SMTP transport

// ! 5.1 - Global Settings for Email Service :
let transporter = nodemailer.createTransport({
  // 1st Way for Gmail:
  service: "gmail",

  // 2nd Way :
  // host: 'stmp.example.com',
  // port: 587

  secure: false,

  auth: {
    user: "aece@dci.org", // write your email address
    pass: "12335kskl", // write your password here!
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ! 5.2 - Defines your Email Details :

let mailOptions = {
  from: '"Nodemailer Contact" <aece@dci.org>', // Sender address
  to: "aece@digitalcareerinstitute.org", // list of receivers
  subject: "Node Contact Request", // plain text body
  text: "Hello FbW10 :)",
  html: output, // html body
};

// ! 5.3 - Send Mail with defined transport object :

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }

  console.log("Message sent:", info.messageID);

  res.render("index", "Email has been sent");
});

// ! Listen Port : ---------------------------------------------

app.listen(port, () => console.log(`App running on port ${port}`));
