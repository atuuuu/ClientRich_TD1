import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsAddRoute extends Route {
  @action
  addSection(nom, desc) {
    if(nom) {

    var newSec = this.store.createRecord('section', {
      name: nom,
      description: desc,
      products: []
    });

    newSec.save();

    this.transitionTo('sections');
    }
  }
}
