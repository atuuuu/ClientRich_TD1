import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ContactModel from "../../../models/contact";

export default class CategoriesContactsAddRoute extends Route {
  id;

  model(params) {
    this.id = this.paramsFor('categories/contacts').category_id
    return {};
  }

  @action save(contact) {
    contact.category = this.id;
    let store = this.get('store');

    var record = store.createRecord('contact', contact);
    record.save();
    this.transitionTo('categories.contacts.add');
  }
}
