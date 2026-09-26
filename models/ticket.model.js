/*
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:['confirmed','cancelled'],
        default:'confirmed',
    },
  },
  {timestamps:true, versionKey:false},
);
ticketSchema.index({event: 1, user: 1}, {unique: true});

export const ticketModel = mongoose.model('Ticket', ticketSchema);

*/
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    reservationCode: {
      type: String,
      required: true,
      unique: true,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

// Un usuario solo puede tener UNA reserva activa (confirmed) por evento.
// El índice es parcial: si cancela, puede volver a reservar (los tickets
// cancelled no chocan contra el índice único).
ticketSchema.index(
  { event: 1, user: 1 },
  { unique: true, partialFilterExpression: { status: 'confirmed' } }
);

export const ticketModel = mongoose.model('Ticket', ticketSchema);