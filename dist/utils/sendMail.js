"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMultipleEmail = exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
async function sendEmail(userEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
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
    }
    catch (error) {
        return { mssg: 'email not sent', status: 'failed', detail: error };
    }
}
exports.sendEmail = sendEmail;
async function sendMultipleEmail(userEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
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
    }
    catch (error) {
        return {
            msg: 'Sorry, Could not sent emails.',
            status: 'failed',
            detail: error,
        };
    }
}
exports.sendMultipleEmail = sendMultipleEmail;
//# sourceMappingURL=sendMail.js.map