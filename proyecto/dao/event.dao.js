export {EventModel} from 'models/event.model.js';

export class EventDAO {
  create(data){
    return EventModel.create(data);
  }
  }
}