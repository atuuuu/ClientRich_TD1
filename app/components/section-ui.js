import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SectionUiComponent extends Component {
  @action
  supprimer(id) {
    console.log("DELETE DELETE DELETE DELEEEEEEEEETE : " + id)
  }
}
