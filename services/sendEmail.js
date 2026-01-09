


import nodemailer from 'nodemailer';


const sendEmail = async (data) => {
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: data.text
    }

    await transporter.sendMail(mailOptions);
}

export default sendEmail;