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
    return model;
  }

  renderTemplate() {
    this.render({outlet: this.outletName});
  }

  @action
  saveProduct(nom, price, image, desc) {
    if(nom && price && desc) {

      var prod = this.store.createRecord('product', {
        name: nom,
        price: price,
        image: image,
        comments: desc,
        packs: [],
        stock: 0,
        promotion: 0,
        section: this.store.peekRecord('section', this.secId)
      });

      prod.save();
      this.cancel();
    } else {
      if(!nom) {
        document.getElementById('')
      }
    }
  }

  @action
  cancel() {
    this.transitionTo('sections.edit', this.secId);
  }
}
