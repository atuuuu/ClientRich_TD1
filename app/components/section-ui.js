import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SectionUiComponent extends Component {
  @action
  supprimer(model, id) {
    var store = model.get('store')

    var section = store.findRecord('section', id, { reload: true });
    section.then(function(value) {
      value.deleteRecord();
      value.save();
    });

  }
}
