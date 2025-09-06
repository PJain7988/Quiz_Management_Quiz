import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function sendVerificationEmail(to, link){
  const info = await transporter.sendMail({
    from: `Quiz App <${process.env.SMTP_USER}>`,
    to,
    subject: 'Verify your email - Quiz App',
    html: `<p>Click the link below to verify your email:</p>
           <p><a href="${link}">${link}</a></p>
           <p>If you did not request this, please ignore.</p>`
  });
  return info;
}
