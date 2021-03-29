import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsRoute extends Route {
  sections;
  oldId;

  model() {
    this.sections = this.store.findAll('section');
    return this;
  }

  @action
  addProduct(id) {
    let tmp = this;
    this.transitionTo('sections').then(function() {
      tmp.transitionTo('sections.addProduct', id);
    });
  }

  @action addSection() {
    this.transitionTo('sections.add');
  }

  @action sectionDetails(id) {
    if(this.oldId === id) {
      this.transitionTo('sections');
      this.oldId = -1;
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
