

import { TicketRepository } from '../repositories/ticket.repository.js';
import { EventRepository } from '../repositories/event.repository.js';
import { TicketDTO } from '../dto/ticket.dto.js';
import { HttpError } from '../utils/errors.js';
import { generateTicketCode } from '../utils/ticket.js';
import { sendTicketConfirmationEmail } from './email.services.js';

export class TicketService {
  constructor(ticketRepo = new TicketRepository(), eventRepo = new EventRepository()) {
    this.ticketRepository = ticketRepo;
    this.eventRepository = eventRepo;
  }

  // user = { id, email, role } (viene del JWT decodificado en req.user)
  async registerTicket(eventId, user, quantity = 1) {
    const qty = Number(quantity) || 1;
    if (qty < 1) {
      throw new HttpError(400, 'quantity debe ser un entero mayor o igual a 1');
    }

    const event = await this.eventRepository.getById(eventId);
    if (!event) {
      throw new HttpError(404, 'Evento no encontrado');
    }
    if (event.status !== 'published') {
      throw new HttpError(400, 'El evento no está publicado');
    }

    const existing = await this.ticketRepository.getActiveByEventAndUser(eventId, user.id);
    if (existing) {
      throw new HttpError(409, 'Ya tenés una inscripción activa para este evento');
    }

    const confirmedCount = await this.ticketRepository.countConfirmed(eventId);
    if (confirmedCount + qty > event.capacity) {
      throw new HttpError(409, 'No hay cupos suficientes disponibles');
    }

    const ticket = await this.ticketRepository.create({
      event: eventId,
      user: user.id,
      quantity: qty,
      status: 'confirmed',
      reservationCode: generateTicketCode(),
    });

    // Notificación por email; no bloqueamos la respuesta si falla el envío.
    sendTicketConfirmationEmail({
      to: user.email,
      userName: user.email,
      eventTitle: event.title,
      reservationCode: ticket.reservationCode,
    }).catch(() => {});

    return TicketDTO.from(ticket);
  }

  async mine(userId) {
    const tickets = await this.ticketRepository.listByUser(userId);
    return TicketDTO.many(tickets);
  }

  async listByEvent(eventId, requester) {
    const event = await this.eventRepository.getById(eventId);
    if (!event) {
      throw new HttpError(404, 'Evento no encontrado');
    }

    const organizerId = event.organizer?._id
      ? event.organizer._id.toString()
      : event.organizer?.toString();
    const isOwner = organizerId === requester.id;

    if (requester.role !== 'admin' && !isOwner) {
      throw new HttpError(403, 'No autorizado para ver los tickets de este evento');
    }

    const tickets = await this.ticketRepository.listByEvent(eventId);
    return TicketDTO.many(tickets);
  }

  async cancel(ticketId, requester) {
    const ticket = await this.ticketRepository.getById(ticketId);
    if (!ticket) {
      throw new HttpError(404, 'Ticket no encontrado');
    }

    const isOwner = ticket.user.toString() === requester.id;
    if (requester.role !== 'admin' && !isOwner) {
      throw new HttpError(403, 'No autorizado para cancelar este ticket');
    }

    if (ticket.status === 'cancelled') {
      throw new HttpError(409, 'El ticket ya está cancelado');
    }

    const cancelled = await this.ticketRepository.cancelById(ticketId);
    return TicketDTO.from(cancelled);
  }
}