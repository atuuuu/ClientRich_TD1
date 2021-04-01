import Route from '@ember/routing/route';
import { action } from '@ember/object';
import Abstractroute from "../Abstractroute";

export default class SectionsEditRoute extends Abstractroute {
  products;
  secId;
  name;

  model(params) {
    this.secId = params.section_id;
    this.products = this.store.peekAll('product');  //Possible car ils sont récupérés à l'ouverture de la page section
    this.name = this.store.peekRecord('section', this.secId).name;
    return this;
  }

  renderTemplate() {
    this.render({outlet: this.secId});
  }

  isValid(id) {
    return this.secId == id;
  }

  @action rename(nouvNom){
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
      tmp.transitionTo('sections.edit.addProduct', id);
    });
  }
}
