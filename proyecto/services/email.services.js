import {transporter} from '../config/email.config.js';

export const sendTicketConfirmationEmail = async (toString, userName, eventTitle, ) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to, 
            subject: 'Confirmación de reserva de Ticket',
            html: `
                <h1>Gracias por tu compra, ${userName}!</h1>
                <p>Has reservado el ticket para el evento: ${eventTitle}</p>
                <p>El codigo de tu ticket es: ${ticketCode}</p>
        `
        })
    } catch (error) {
        console.log('Error al enviar el correo de confirmación:', error);
        throw new Error('Error al enviar el correo de confirmación');
    }
}