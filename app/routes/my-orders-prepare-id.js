import Route from "@ember/routing/route";
import Abstractroute from "./Abstractroute";

export default class OrdersIdRoute extends Abstractroute {

  tmp = {};

  model(params) {
    let ceci = this;
    this.tmp.data = this.store.peekRecord("order", params.order_id);
    this.tmp.data.products = new Array();
    this.tmp.data.details.then(function(value) {
      value.forEach(function(detail) {
        let prodId = detail.id.split(',')[1]
        ceci.tmp.data.products.push(ceci.store.findRecord('product', prodId))
      })
    })
    return this.tmp;
  }
}
