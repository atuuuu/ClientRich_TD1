import Route from '@ember/routing/route';
import { action } from '@ember/object';
import Abstractroute from "../Abstractroute";

export default class SectionsAddRoute extends Abstractroute {
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
