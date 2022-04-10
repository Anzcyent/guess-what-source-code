const nodemailer = require("nodemailer");

function sendMail(options, res) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });

    transporter.sendMail(options, (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });

        console.log(`Message sent: %s ${result.messageId}`);
    })
}

module.exports = sendMail;