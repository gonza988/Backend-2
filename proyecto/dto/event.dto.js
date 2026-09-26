import {UserDto} from "./user.dto.js";
//todo: ide, title, description, date, capacity, category, status, organizer(userDTO)

export class EventDTO {
    constructor(event) {
        this.id = event._id;
        this.title = event.title;
        this.description = event.description;
        this.date = event.date;
        this.capacity = event.capacity;
        this.category = event.category;
        this.status = event.status;
        this.organizer = new UserDto(event.organizer);
    }
    static from(event) {
        return event ? new EventDTO(event) : null;
    }
    static many(events) {
        return events.map((event) => EventDTO.from(event));
    }
}