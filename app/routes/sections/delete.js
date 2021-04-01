import Route from "@ember/routing/route";
import { action } from "@ember/object";
import Abstractroute from "../Abstractroute";

export default class SectionsDeleteRoute extends Abstractroute {
  secId;

  model(params) {
    this.secId = params.section_id;
    let model =  this.store.findRecord("section", this.secId, { reload: true });
    return model;
  }

  renderTemplate() {
    this.render({ outlet: this.secId });
  }

  @action
  supprimer() {
    var section = this.store.peekRecord("section", this.secId);
    section.products.then(function(value) {
      value.forEach(function(val) {
        val.deleteRecord();
        val.save();
      });
    }).then(function() {
      new Promise(r => setTimeout(r, 1)).then(function() {  //Sécurité (ça marche pas sans)
        section.deleteRecord();
        section.save();
      });
    });
    this.transitionTo('sections');
  }
}
