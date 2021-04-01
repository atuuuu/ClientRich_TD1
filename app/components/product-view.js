import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class ProductViewComponent extends Component {
  oldId;

  @action
  editProduct(model, section_id, product_id) {
    if (product_id == this.oldId) {
      model.transitionTo("sections.edit");
      this.oldId = undefined;
    } else {
      model.transitionTo("sections.edit").then(function() {
        model.transitionTo("sections.edit.edit", section_id, product_id);
      });
      this.oldId = product_id;
    }
  }
}
