const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(to, link){
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your QuizApp account',
    html: `<p>Click to verify: <a href="${link}">${link}</a></p>`
  });
  return info;
}

module.exports = { sendVerificationEmail };
