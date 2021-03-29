import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr ('number') idUser;
  @attr ('number') idEmployee;
  @attr ('date') dateCreation;
  @attr ('string') status;
  @attr ('number') amount;
  @attr ('number') toPay;
  @attr ('number') itemsNumber;
  @attr ('number') missingNumber;
  @hasMany ('orderdetail') details;
  @belongsTo ('timeSlot') idTimeSlot;
  @belongsTo ('employee') employee;
  @belongsTo ('user') user;

  get count() {
    return this.details.length;
  }
}
