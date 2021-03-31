import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsEditRoute extends Route {
  secId;

  model(params) {
    this.secId = params.section_id;
    var sect = {};
    sect.products = this.store.findAll('product');
    sect.sectId = this.secId;
    return sect;
  }

  renderTemplate() {
    this.render({outlet: this.secId});
  }

  isValid(id) {
    return this.secId == id;
  }

  @action rename(nouvNom){
    console.log(nouvNom);
    this.store.findRecord('section', this.secId).then(function(section) {
      section.set('name', nouvNom);
      section.save();
    });
    this.transitionTo('sections');
  }

  @action
  addProduct(id) {
    let tmp = this;
    this.transitionTo('sections').then(function() {
      tmp.transitionTo('sections.addProduct', id);
    });
  }
}
