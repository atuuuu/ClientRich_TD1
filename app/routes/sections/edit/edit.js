import Route from "@ember/routing/route";
import { action } from "@ember/object";
import Abstractroute from "../../Abstractroute";

export default class SectionEditRoute extends Abstractroute {
  prodId;
  produit;
  secId;

  model(params) {
    this.prodId = params.product_id;
    this.produit = this.store.findRecord("product", this.prodId, { reload: true });
    return this;
  }

  @action
  willTransition(transition) {
    this.save();
  }

  renderTemplate() {
    this.render({ outlet: this.prodId });
  }

  @action
  saveProduct() {
    let tmp = this;
    this.save().then(function() {
      tmp.transitionTo("sections.edit", tmp.secId);
    });
  }

  async save() {
    let prod = await this.produit;
    this.secId = prod.section.get("id");
    prod.save();
  }
}
