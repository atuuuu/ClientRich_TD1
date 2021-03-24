import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Abstractroute from "./Abstractroute";
import RSVP from 'rsvp';

export default class IndexRoute extends Abstractroute {

  model() {
    let user = this.userAuth.user;
    if (user) {
      return RSVP.hash({
        orders: this.store.query('order', {
          filter: { idEmployee: user.id },
          include: 'orderdetails',
        }),
        employee: user,
      });
    }
  }

  @action
  openSection() {
    this.transitionTo('sections');
  }

  @action
  openProduits() {
    this.transitionTo('products');
  }

  @action
  openCommandes() {
    this.transitionTo('orders');
  }

  @action
  open() {
    console.log("Not implemented yet");
  }


}
