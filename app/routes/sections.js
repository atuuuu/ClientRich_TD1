import Route from '@ember/routing/route';
import { action } from '@ember/object';
import Abstractroute from "./Abstractroute";

export default class SectionsRoute extends Abstractroute {
  sections;
  oldId;
  oldIdSuppr;

  model() {
    this.sections = this.store.findAll('section');
    this.store.findAll('product');  //Prépare l'affichage du détail des sections en prenant les produits en mémoire
    return this;
  }

  @action
  willTransition(transition) {
    if(transition.from.name=='sections.edit'){
    this.oldId = undefined;
    this.oldIdSuppr = undefined;}
    console.log("remise à 0")
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
