import Route from '@ember/routing/route';

export default class CategoriesRoute extends Route {
  model() {
    let store = this.get('store');
    let categories = store.findAll('category');
    return categories;
  }
}
