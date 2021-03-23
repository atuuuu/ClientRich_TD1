import Model, { attr, belongsTo  } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr ('number') idUser;
  @attr ('number') idEmployee;
  @attr ('date') dateCreation;
  @attr ('string') status;
  @attr ('number') amount;
  @attr ('number') toPay;
  @attr ('number') itemsNumber;
  @attr ('number') missingNumber;
  @attr ('number') idTimeSlot;
  //@belongsTo ('timeSlot') idTimeSlot; MODEL TIMESLOT
  @belongsTo ('employee') employee;
  //@belongsTo ('user') user;
}
