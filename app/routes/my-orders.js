import Route from '@ember/routing/route';
import Abstractroute from "./Abstractroute";
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class OrdersRoute extends Abstractroute {

  model() {
    let user = this.userAuth.user;
    if (user) {
      let tmp = RSVP.hash({
        orders: this.store.query('order', {
          filter: { idEmployee: user.id },
          include: 'orderdetails',
          include: 'timeslot',
        }),
        employee: user,
      });
      return tmp;
    }
  }
}
