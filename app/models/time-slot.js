import Model, { attr } from '@ember-data/model';

export default class TimeSlotModel extends Model {
  @attr('datetime') slotDate;
  @attr('bool') full;
  @attr('bool') expired;
}
