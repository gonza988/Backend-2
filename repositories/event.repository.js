import {EventDAO} from '../dao/event.dao.js';

//todo: create, list, getById, update, delete
export class EventRepository {
    constructor(eventDao = new EventDAO()) {
        this.dao=eventDao;
    }
    create(_data){
        return this.dao.create(_data);
    }
    list(_filter){
        return this.dao.findAll(_filter);
    }
    getById(_id){
        return this.dao.findById(_id);
    }
    updateById(_id, _data){
        return this.dao.updateById(_id, _data);
    }
}