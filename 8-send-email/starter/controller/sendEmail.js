const nodemailer = require("nodemailer"); // npm for sending an email from nodejs. now sending though ethereal
const sgMail = require("@sendgrid/mail"); // Send Grid is server for email sending for real production.

const sendEmailEthereal = async (req, res) => {
  let testAccout = await nodemailer.createTestAccount();

  //below, it is host to sending an email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "eliane.kertzmann@ethereal.email",
      pass: "yWkzSEsnvPbFUvev64",
    },
  });
  //below, it is info of sending and receiving email. The host that sending email can be unlike as "from" in infomation email 
  let info = await transporter.sendMail({
    from: '"Coding Addict", <codingaddict@gmail.com>',
    to: "bar@example.com",
    subject: "Hello",
    html: "<h2>Sending Emails with Node.js</h2>",
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "learncode@mail.com", // Change to your recipient
    from: "learncodetutorial@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
