export const generateTicketCode=() => {
const random = Math.random()
.toString(36)
.substring(2, 10)
.toUpperCase();

return `TICKET-${random}`;
}