import Route from '@ember/routing/route';

export default class SectionsRoute extends Route {
  store;

  model() {
    this.store = this.get('store');
    var sections = this.store.findAll('section');
    sections.then(value => {
      console.log(value);
    })
    return sections;
  }
}
