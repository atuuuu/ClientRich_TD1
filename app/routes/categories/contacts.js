import Route from '@ember/routing/route';

export default class CategoriesContactsRoute extends Route {

  async model(params) {
    let store = this.get('store');
    let contacts = await store.findAll('contact');
    var contact = contacts.filter(contact => contact.category === this.paramsFor('categories/contacts').category_id);

    return contact;
  }
}
