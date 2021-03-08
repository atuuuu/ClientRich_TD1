import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class CategoriesContactsRoute extends Route {
  addContactDisplay = true;

  async model(params) {
    let store = this.get('store');
    let contacts = await store.findAll('contact');
    var contact = contacts.filter(contact => contact.category === this.paramsFor('categories/contacts').category_id);

    return contact;
  }

  @action willTransition(transition) {
    console.log(transition.from.name);
    if(transition.from.name === 'categories.contacts.add');
      this.addContactDisplay = true;

    console.log("Après transition : " + this.addContactDisplay);
  }

  @action addContact() {
    console.log(this.addContactDisplay)
    if(this.addContactDisplay)
    {
      this.transitionTo('categories.contacts.add');
      this.addContactDisplay = false;
    }
    else
    {
      this.transitionTo('categories.contacts');
      this.addContactDisplay = true;
    }
  }
}
