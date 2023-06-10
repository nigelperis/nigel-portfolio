const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nperis27@gmail.com',
    pass: 'vuhdmdolawntwogm',
  },
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'nperis27@gmail.com',
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/success');
    }
  });
});

const serveFile = (res, filename) => {
  res.sendFile(path.join(__dirname, filename));
};

app.get('/', (req, res) => {
  serveFile(res, 'index.html');
});

app.get('/projects', (req, res) => {
  serveFile(res, 'projects.html');
});

app.get('/contact', (req, res) => {
  serveFile(res, 'contact.html');
});

app.get('/success', (req, res) => {
  serveFile(res, 'success.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
