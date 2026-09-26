import { domainEventFactories } from "./event.rules.js";

const MAX_EVENTS = 100;

class DomainEventBus {
    constructor() {
        this.events = [];
        this.handlers = new Map();
    }

    on(type, handler) {
        const current = this.handlers.get(type) || [];
        current.push(handler);
        this.handlers.set(type, current);
    }

    emit(domainEvent) {
        this.events.unshift(domainEvent);
        if (this.events.length > MAX_EVENTS) {
            this.events.pop();
        }

        const handlers = this.handlers.get(domainEvent.type) || [];
        handlers.forEach((handler) => handler(domainEvent));
    }

    publishCreated(event) {
        this.emit(domainEventFactories.created(event));
    }

    publishUpdated(event, changes) {
        this.emit(domainEventFactories.updated(event, changes));
    }

    publishCancelled(event) {
        this.emit(domainEventFactories.cancelled(event));
    }

    getRecent(limit = 20) {
        return this.events.slice(0, limit);
    }

    clear() {
        this.events = [];
    }
}

export const domainEventBus = new DomainEventBus();

domainEventBus.on("event.created", (event) => {
    console.log(`[domain] ${event.type}`, event.payload);
});

domainEventBus.on("event.updated", (event) => {
    console.log(`[domain] ${event.type}`, event.payload);
});

domainEventBus.on("event.cancelled", (event) => {
    console.log(`[domain] ${event.type}`, event.payload);
});