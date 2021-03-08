import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class CategoriesRoute extends Route {
  addContactDisplay = true;

  model() {
    let store = this.get('store');
    let categories = store.findAll('category');
    return categories;
  }

  @action willTransition(transition) {
    console.log(transition.from.name);
    if(transition.from.name == 'categories.index')
      this.addContactDisplay = true;
  }


  @action addCategory() {
    if(this.addContactDisplay) this.transitionTo('categories.add');
    else this.transitionTo('categories');
    this.addContactDisplay = !this.addContactDisplay;
  }
}
