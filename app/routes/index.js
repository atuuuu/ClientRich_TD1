import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Abstractroute from "./Abstractroute";

export default class IndexRoute extends Abstractroute {

  model() {
    return this.get('store').findAll('order');
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
