import Model, { attr, belongsTo } from '@ember-data/model';

export default class TimeSlotModel extends Model {
  @attr('date') slotDate;
  @attr('boolean') full;
  @attr('boolean') expired;
  @belongsTo('order') order;
}
