import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class SectionUiComponent extends Component {

  @action
  supprimer(model, id) {
    model.oldId = undefined;
    if (id != model.oldIdSuppr) {
      model.oldIdSuppr = id;
      model.transitionTo("sections").then(function() {
        model.transitionTo("sections.delete", id);
      });
    } else {
      model.transitionTo("sections");
      model.oldIdSuppr = undefined;
    }
  }

  @action
  ajouterProduit(model, name, id) {
    model.addProduct(id);
  }

  @action
  sectionDetails(model, id) {
    model.sectionDetails(id);
  }
}
