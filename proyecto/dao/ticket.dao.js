import {TicketModel} from '../models/ticket.model.js'

//todo: create, createByEvent, getById, delete, findByUser

export class TicketDAO {
    create(data){
        return TicketModel.create(data);
    }
    countByEvent(eventId){
        return TicketModel.countDocuments({event: eventId, status: 'confirmed'});
    }

    findByEventAndUser(eventId, userId){
        return TicketModel.findOne({event: eventId, user: userId}).lean();
    }
}