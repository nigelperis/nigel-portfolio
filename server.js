const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// POST endpoint for the contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transport object with your email service provider details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nperis27@gmail.com',
      pass: 'vuhdmdolawntwogm', // Use the app password here
    },
  });

  // Configure the email options
  const mailOptions = {
    from: email,
    to: 'nperis27@gmail.com',
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/success'); // Redirect to success.html
    }
  });
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the projects.html file for /projects URL
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// Serve the contact.html file for /contact URL
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Serve the success.html file for /success URL
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
