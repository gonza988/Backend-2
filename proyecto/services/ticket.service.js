import {ticketRepository} from '../repositories/ticket.repository.js';
import {eventRepository} from '../repositories/event.repository.js';
import {TicketDTO} from '../dto/ticket.dto.js';
import {HttpError} from '../utils/errors.js';

export class TicketService {
constructor(
    ticketRepo = new ticketRepository(),
 eventRepo = new eventRepository(),
) {
    this.ticketRepository = ticketRepository;
    this.eventRepository = eventRepository;
}
async registerTicket(eventId, userId) {
    const event = await this.eventRepository.getById(eventId);
    if(event || event.status !== 'published') {
        throw new HttpError(400, 'Event no disponible');
    }
    const existing= await this.ticketRepository.getByEventAndUser(
        eventId, 
        userId);
        if(existing) {
            throw new HttpError(400, 'Ya estas inscripto para este evento');
        }
        const confirmedCount = await this.ticketRepository.countConfirmed(eventId);
        if(confirmedCount >= event.capacity) {
            throw new HttpError(400, 'Evento sin cupos disponibles');
        }
        const ticket = await this.ticketRepository.create({
            event: eventId,
            user: userId,
            status: 'confirmed',
        });
        return TicketDTO.from(ticket);
    }
    async mine(userId) {
        const tickets = await this.ticketRepository.listByUser(userId);
       return TicketDTO.many(tickets);
    }
}