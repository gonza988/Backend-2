
export class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id;

    // Si viene populado (tiene "title"), devolvemos datos básicos del evento.
    // Si no, devolvemos solo el id de referencia.
    this.event =
      ticket.event && ticket.event.title
        ? {
            id: ticket.event._id,
            title: ticket.event.title,
            date: ticket.event.date,
            location: ticket.event.location,
            status: ticket.event.status,
          }
        : ticket.event;

    this.user =
      ticket.user && ticket.user.email
        ? {
            id: ticket.user._id,
            first_name: ticket.user.first_name,
            last_name: ticket.user.last_name,
            email: ticket.user.email,
          }
        : ticket.user;

    this.status = ticket.status;
    this.quantity = ticket.quantity;
    this.reservationCode = ticket.reservationCode;
    this.createdAt = ticket.createdAt;
    this.cancelledAt = ticket.cancelledAt;
  }

  static from(ticket) {
    return ticket ? new TicketDTO(ticket) : null;
  }

  static many(tickets) {
    return tickets.map((ticket) => TicketDTO.from(ticket));
  }
}