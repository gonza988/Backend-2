

import { TicketService } from '../services/ticket.service.js';

const ticketService = new TicketService();

const handleError = (res, error) => {
  const status = error.status || 500;
  res.status(status).json({
    status: 'error',
    message: error.message || 'Error interno del servidor',
  });
};

// POST /api/events/:eid/tickets
export const createTicket = async (req, res) => {
  try {
    const { eid } = req.params;
    const { quantity } = req.body;
    const ticket = await ticketService.registerTicket(eid, req.user, quantity);
    res.status(201).json({ status: 'success', payload: ticket });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/tickets/my-tickets
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await ticketService.mine(req.user.id);
    res.status(200).json({ status: 'success', payload: tickets });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/events/:eid/tickets
export const getEventTickets = async (req, res) => {
  try {
    const { eid } = req.params;
    const tickets = await ticketService.listByEvent(eid, req.user);
    res.status(200).json({ status: 'success', payload: tickets });
  } catch (error) {
    handleError(res, error);
  }
};

// PATCH /api/tickets/:tid/cancel
export const cancelTicket = async (req, res) => {
  try {
    const { tid } = req.params;
    const ticket = await ticketService.cancel(tid, req.user);
    res.status(200).json({ status: 'success', payload: ticket });
  } catch (error) {
    handleError(res, error);
  }
};
