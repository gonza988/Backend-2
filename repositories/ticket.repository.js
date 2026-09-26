import {TicketDAO} from '../dao/ticket.dao.js';

//todo: create, createByEvent, getById, delete, findByUser, listAll

export class TicketRepository {
    constructor(dao=new TicketDAO()){
        this.dao= dao;
    }
    create(_data){
      return   this.dao.create(_data);
    }
    countConfirmed(_eventId){
throw new Error('TODO ticketRepository.countConfirmed');
}
getByEventAndUser(_eventId, _userId){
    throw new Error('TODO ticketRepository.getByEventAndUser');
}
lisByUser(_userId){
    throw new Error('TODO ticketRepository.lisByUser');
}
listAll(){
    throw new Error('TODO ticketRepository.listAll');
}
}