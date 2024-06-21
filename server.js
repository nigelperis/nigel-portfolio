require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "frontend");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(helmet());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Routes
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const mailOptions = {
    from: email,
    to: process.env.MAIL_USER,
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/success");
    }
  });
});

// Static file routes
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "..", "index.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(publicPath, "projects.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contact.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(publicPath, "success.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
