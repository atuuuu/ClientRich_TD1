import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsRoute extends Route {
  sections;
  oldId;
  oldIdSuppr;

  model() {
    this.sections = this.store.findAll('section');
    this.store.findAll('product');
    return this;
  }

  @action
  addProduct(id) {
    this.oldIdSuppr = undefined;
    this.oldId = undefined;
    let tmp = this;
    this.transitionTo('sections').then(function() {
      tmp.transitionTo('sections.addProduct', id);
    });
  }

  @action addSection() {
    this.transitionTo('sections.add');
  }

  @action sectionDetails(id) {
    this.oldIdSuppr = undefined;
    if(this.oldId === id) {
      this.transitionTo('sections');
      this.oldId = undefined;
    }
    else {
      this.oldId = id;
      let tmp = this;
      this.transitionTo('sections').then(function() {
        tmp.transitionTo('sections.edit', id);
      });
    }
  }
}
