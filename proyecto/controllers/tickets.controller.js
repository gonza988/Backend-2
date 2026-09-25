import { ticketModel } from '../models/ticket.model.js';

export const generateTicketCode = () => {
    const random = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `TICKET-${random}`;
};
//validar fecha del evento 


//validar inscripciones duplicadas

export const createTicket = async (req, res) => {
    try {
        const { amount, purchaser } = req.body;

        if (!amount || !purchaser) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos obligatorios' });
        }

        const newTicket = await ticketModel.create({
            code: generateTicketCode(),
            amount,
            purchaser
        });

        return res.status(201).json({ status: 'success', payload: newTicket });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error al crear el ticket' });
    }
};

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find();
        return res.status(200).json({ status: 'success', payload: tickets });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error al obtener los tickets' });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const { tid } = req.params;
        const ticket = await ticketModel.findById(tid);

        if (!ticket) {
            return res.status(404).json({ status: 'error', message: 'Ticket no encontrado' });
        }

        return res.status(200).json({ status: 'success', payload: ticket });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error al obtener el ticket' });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const { tid } = req.params;
        const updatedTicket = await ticketModel.findByIdAndUpdate(tid, req.body, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ status: 'error', message: 'Ticket no encontrado' });
        }

        return res.status(200).json({ status: 'success', payload: updatedTicket });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error al actualizar el ticket' });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const { tid } = req.params;
        const deletedTicket = await ticketModel.findByIdAndDelete(tid);

        if (!deletedTicket) {
            return res.status(404).json({ status: 'error', message: 'Ticket no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Ticket eliminado' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error al eliminar el ticket' });
    }
};