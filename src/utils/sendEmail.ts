const nodemailer = require('nodemailer');

export async function sendEmail(userEmail: any, subject: any, text: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      // secure: true,
      // service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: userEmail,
      bcc:['satya.tyagi@effectualservices.com'],
      subject: subject,
      html: text,
    });
    return true;
  } catch (error) {
    return { mssg: 'email not sent', status: 'failed', detail: error };
  }
}

export async function sendMultipleEmail(
  userEmail: any,
  subject: any,
  text: any,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      // secure: true,
      //   service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: userEmail,
      bcc:['satya.tyagi@effectualservices.com'],
      subject: subject,
      html: text,
    });
    return true;
  } catch (error) {
    return {
      msg: 'Sorry, Could not sent emails.',
      status: 'failed',
      detail: error,
    };
  }
}

