import {EventRepository} from './repositories/event.repository.js';
import {EventDTO} from './dto/event.dto.js';
import {HttpError} from './utils/errors.js';
import { domainEventBus } from '../domain/event.domain-events.js';
import { assertEventIsEditable,
    assertEventPayload,
    assertStatusTransition,
    assertValidObjectId,
    buildEventFilter,
BusinesError} from "./domaint/event.rules.js"
import {  EventDTO} from '../dto/event.dto.js';



export class EventService {
    constructor(eventRepo = new EventRepository()) {
        this.eventRepository = eventRepository;
    }
    async list() {
        const events = await this.eventRepository.list({status: 'published'});
        return EventDTO.many(events);
    }
    async list(){
        const events = await this.eventRepository.list({status: 'published'});
        return EventDTO.many(events);
    }

    async getById(id) {
        const event = await this.eventRepository.getById(id);
        if(!event){
            throw new HttpError(404, 'Evento no encontrado');
        }
    return EventDTO.from(event);
    }

    async create(payload, organizerId) {
        const {title, description, starts_at, capacity} = payload;
if(!title || !description || !starts_at || !capacity) {
            throw new HttpError(400, 'title, description, starts_at y capacity son requeridos');
        }
        const event = await this.eventRepository.create({
            title,
            description,
            starts_at,
            capacity,
            organizer_id: organizerId
        });
        return EventDTO.from(event);
    }

    async update(id, payload) {
        const event = await this.eventRepository.update(id,payload);
        if(!event){
            throw new HttpError(404, 'Evento no encontrado');

        }
        return EventDTO.from(event);
}
}