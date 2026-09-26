
import { transporter } from '../config/mailer.config.js';

export const sendTicketConfirmationEmail = async ({ to, userName, eventTitle, reservationCode }) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Confirmación de reserva de ticket',
      html: `
        <h1>¡Gracias por tu reserva, ${userName}!</h1>
        <p>Reservaste un cupo para el evento: <strong>${eventTitle}</strong></p>
        <p>Tu código de reserva es: <strong>${reservationCode}</strong></p>
      `,
    });
  } catch (error) {
    // No relanzamos: que falle el mail no debe tumbar la creación del ticket.
    console.error('Error al enviar el correo de confirmación:', error.message);
  }
};