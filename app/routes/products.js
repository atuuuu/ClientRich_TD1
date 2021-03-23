import Route from '@ember/routing/route';
import Abstractroute from "./Abstractroute";

export default class ProductsRoute extends Abstractroute {

  model() {
    var model = {};
    var prod = this.get('store').findAll('product');

    model.product = prod;
    return prod;
  }
}
