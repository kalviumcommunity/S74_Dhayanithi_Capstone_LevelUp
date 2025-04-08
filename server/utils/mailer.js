import nodemailer from 'nodemailer';

export const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,     // your mail
      pass: process.env.MAIL_PASS      // app password
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your OTP for LevelUp',
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
};
