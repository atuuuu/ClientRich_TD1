import Route from '@ember/routing/route';
import { action } from '@ember/object';
import Abstractroute from "../../../Abstractroute";

export default class SectionsEditEditDeleteRoute extends Abstractroute {
  prodId;
  secId;

  model() {
    this.prodId = this.modelFor('sections.edit.edit').prodId;
    this.secId = this.modelFor('sections.edit').secId;
    return this;
  }

  @action
  delete() {
    let tmp = this;
    this.store.findRecord('product', this.prodId, {reload: true}).then(function(val) {
      val.deleteRecord();
      val.save();
      tmp.transitionTo('sections.edit', tmp.secId);
    });
  }
}
