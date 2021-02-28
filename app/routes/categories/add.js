import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ContactModel from "../../models/contact";

export default class CategoriesAddRoute extends Route {
  model() {
    return {};
  }

  @action save(category) {
    let store = this.get('store');
    let record = store.createRecord('category', category);
    record.save();
  }
}
