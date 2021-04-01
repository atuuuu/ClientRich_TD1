import Route from "@ember/routing/route";
import { action } from "@ember/object";
import Abstractroute from "../../Abstractroute";

export default class SectionEditRoute extends Abstractroute {
  prodId;

  model(params) {
    this.prodId = params.product_id;
    return this;
  }

  renderTemplate() {
    this.render({ outlet: this.prodId });
  }

  @action
  saveProduct(newName, newPrice, newDesc) {
    console.log(newName + " " + newPrice + " " + newDesc);
    this.store.findRecord("product", this.prodId).then(function(prod) {
      if (newName) {
        prod.set("name", newName);
        prod.save();
      }
      if (newPrice) {
        prod.set("price", newPrice);
        prod.save();
      }
      if (newDesc) {
        prod.set("comments", newDesc);
        prod.save();
      }

    });
  }
}
