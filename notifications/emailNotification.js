const nodemailer = require('nodemailer');
class EmailNotification {
    constructor() {
        this.transports = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async send({ username, address, message, id }) {
        try {
            return { 
                ...await this.transports.sendMail({
                    from: process.env.EMAIL_SENDER,
                    to: process.env.EMAIL_RECEIVER,
                    subject: 'Message',
                    html: `${username}, ${address}, ${message}`,
                }),
                id,
            }
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = EmailNotification;