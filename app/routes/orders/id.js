import Route from '@ember/routing/route';

export default class OrdersIdRoute extends Route {
  model(params) {
    var model = {};
    model.data = this.get('store').findRecord('order', params.order_id);
    model.products = this.store.findRecord('orderdetail', params.order_id);
    return model;
  }
}
