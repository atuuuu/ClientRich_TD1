import Route from '@ember/routing/route';

export default class TestListRoute extends Route {
  model() {
    return this.store.findAll('contact')
  }
}
