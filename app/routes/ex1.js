import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class Ex1Route extends Route {
  items;

  model() {
    return {
      items: 'hello',
    };
  }

  @action
  save(content) {
    this.model = this.modelFor(this.routeName);
    this.model.items = content.split('\n');
    this.transitionTo('ex1b');
  }
}
