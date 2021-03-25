import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsRoute extends Route {
  sections;

  model() {
    this.sections = this.store.findAll('section');
    return this;
  }

  @action
  addProduct(id) {
    this.transitionTo('sections.addProduct', id);
  }

  @action addSection() {
    this.transitionTo('sections.add')
  }
}
