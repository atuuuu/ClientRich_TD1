import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProductViewComponent extends Component {
  @action
  editProduct(model, product_id, section_id) {
    model.transitionTo('sections.edit.edit', section_id, product_id);
  }
}
