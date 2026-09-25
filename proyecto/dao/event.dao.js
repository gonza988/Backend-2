export {EventModel} from 'models/event.model.js';

export class EventDAO {
  create(data){
    return EventModel.create(data);
  }
  findAll(filters={}){
return EventModel.find(filters).populate('organizer', 'first_name last_name email');
  }
  findById(id){
    return EventModel.findById(id).populate('organizer', 'first_name last_name email'.lean());
  }
  updateById(id, _data){
    return EventModel.findByIdAndUpdate(id,_data);
  }
}