export const EVENT_STATUSES = ["draft", "scheduled", "cancelled", "completed"];

export const STATUS_TRANSITIONS = {
    draft: ["draft", "scheduled", "cancelled"],
    scheduled: ["scheduled", "cancelled", "completed"],
    cancelled: [],
    completed: []
};

export const REQUIRED_EVENT_FIELDS = [
    "title",
    "description",
    "location",
    "start_date",
    "end_date",
    "capacity",
    "price"
];

export const FILTER_DEFINITIONS = {
    status: { type: "enum", values: EVENT_STATUSES, field: "status" },
    location: { type: "string", field: "location" },
    q: { type: "regex", field: "title" },
    organizerId: { type: "objectId", field: "organizer" },
    from: { type: "dateGte", field: "start_date" },
    to: { type: "dateLte", field: "start_date" },
    minPrice: { type: "numberGte", field: "price" },
    maxPrice: { type: "numberLte", field: "price" },
    minCapacity: { type: "numberGte", field: "capacity" },
    maxCapacity: { type: "numberLte", field: "capacity" }
};

export const DOMAIN_EVENT_TYPES = {
    CREATED: "event.created",
    UPDATED: "event.updated",
    CANCELLED: "event.cancelled"
};