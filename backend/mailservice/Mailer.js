import mailer from 'nodemailer';

const transporter = mailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

const sendMail = async (to, subject, text) => {
    const info = await transporter.sendMail({
        from: process.env.USER,
        to: to,
        subject: subject,
        text: text
    })
}

export default sendMail;