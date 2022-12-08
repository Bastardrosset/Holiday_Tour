const nodeMailer = require('nodemailer');

const sendEmail = async options => {
// 1) Create a transport
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        logger: true,
        tls: { rejectUnAuthorized: true },
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });
// 2) Define the email options
    const mailOptions = {
        from: 'Xavier B <xavier@outlook.fr>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };
// 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;