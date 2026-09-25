import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
host: process.env.MAIL_HOST,
port: process.env.MAIL_PORT ,
secure: false,
auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
}
});