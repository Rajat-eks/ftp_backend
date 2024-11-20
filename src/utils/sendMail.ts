import * as nodemailer from 'nodemailer';

export async function sendEmail(userEmail: any, subject: any, text: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      // secure: true,
      // service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: subject,
      html: text,
    });
    return true;
  } catch (error) {
    console.log("error when send mail",error)
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
      host: process.env.MAIL_HOST,
      port: 587,
      // secure: true,
      //   service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: subject,
      html: text,
    });
    return true;
  } catch (error) {
    console.log("error when send mail",error)
    return {
      msg: 'Sorry, Could not sent emails.',
      status: 'failed',
      detail: error,
    };
  }
}
