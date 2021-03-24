import Route from '@ember/routing/route';

export default class SectionsRoute extends Route {
  sections;

  model() {
    this.sections = this.store.findAll('section');
    return this;
  }

  addProduct() {
    this.transitionTo('products.add');
  }
}
