import Route from '@ember/routing/route';
import { action } from '@ember/object';
import Abstractroute from "../../Abstractroute";

export default class SectionsAddProductRoute extends Abstractroute {
  outletName;
  secId;

  model(params) {
    let model;
    let parent = this.modelFor('sections.edit');
    this.secId = parent.secId;
    model = this.store.peekRecord('section', parent.secId);
    this.outletName = model.name;
    console.log(this.outletName);
    return model;
  }

  renderTemplate() {
    this.render({outlet: this.outletName});
  }

  @action
  saveProduct(nom, prix, image, desc) {
    if(nom && prix && desc) {
      console.log(nom + ' ' + prix + ' ' + image + ' ' + desc + ' ' + this.secId);

      var prod = this.store.createRecord('product', {
        name: nom,
        price: prix,
        image: image,
        comments: desc,
        packs: [],
        stock: 0,
        promotion: 0,
        section: this.store.peekRecord('section', this.secId)
      });

      prod.save();
      this.cancel();
    }
  }

  @action
  cancel() {
    this.transitionTo('sections.edit', this.secId);
  }
}
