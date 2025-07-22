import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "SendGrid", // OR use "Gmail" with OAuth2
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Auth App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });
};
