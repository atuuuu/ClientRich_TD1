import Route from "@ember/routing/route";
import { action } from "@ember/object";
import Abstractroute from "../../Abstractroute";

export default class SectionEditRoute extends Abstractroute {
  prodId;
  produit;
  secId;

  model(params) {
    this.prodId = params.product_id;
    this.produit = this.store.findRecord("product", this.prodId, { reload: true} );
    return this;
  }

  renderTemplate() {
    this.render({ outlet: this.prodId });
  }

  @action
  saveProduct() {
    let tmp = this;
    this.produit.then(function(prod) {
      tmp.secId = prod.section.get('id');
      prod.save();
      tmp.transitionTo('sections.edit', tmp.secId);
    });
  }
}
