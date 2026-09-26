
import mongoose from 'mongoose';
import { ticketModel } from '../models/ticket.model.js';

export class TicketDAO {
  create(data) {
    return ticketModel.create(data);
  }

  findById(id) {
    return ticketModel.findById(id);
  }

  // Suma de "quantity" de todos los tickets confirmados de un evento
  // (esto es el cupo realmente ocupado; los cancelled no suman).
  async countConfirmedByEvent(eventId) {
    const result = await ticketModel.aggregate([
      { $match: { event: new mongoose.Types.ObjectId(eventId), status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    return result[0]?.total ?? 0;
  }

  findActiveByEventAndUser(eventId, userId) {
    return ticketModel.findOne({ event: eventId, user: userId, status: 'confirmed' });
  }

  findByUser(userId) {
    return ticketModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('event', 'title date location status');
  }

  findByEvent(eventId) {
    return ticketModel
      .find({ event: eventId })
      .sort({ createdAt: -1 })
      .populate('user', 'first_name last_name email');
  }

  cancelById(id) {
    return ticketModel.findByIdAndUpdate(
      id,
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true }
    );
  }
}