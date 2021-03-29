import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SectionsAddProductRoute extends Route {
  outletName;
  secId;

  model(params) {
    this.secId = params.section_id;
    this.outletName = this.store.peekRecord('section', params.section_id).name;
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
    }
  }

  @action
  cancel() {
    this.transitionTo('sections');
  }
}
