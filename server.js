const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3000;
const publicPath = path.join(__dirname, "frontend");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nperis27@gmail.com",
    pass: "vuhdmdolawntwogm",
  },
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: "nperis27@gmail.com",
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


app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath,'..',"index.html"));
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
