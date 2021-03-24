import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsRoute extends Route {
  sections;

  model() {
    this.sections = this.store.findAll('section');
    return this;
  }

  addProduct() {
    this.transitionTo('sections.addProduct');
  }

  @action addSection() {
    this.transitionTo('sections.add')
  }
}
