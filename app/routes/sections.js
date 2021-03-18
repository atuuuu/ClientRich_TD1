import Route from '@ember/routing/route';

export default class SectionsRoute extends Route {
  store;
  sections = [];

  model() {
    this.store = this.get('store');
    this.store.findAll('section').then(sec => {
      this.sections.push(sec);
      console.log(sec);
    });

    console.log(this.sections);
    return this.sections;
  }
}
