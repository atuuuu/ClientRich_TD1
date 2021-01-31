import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { setOwner } from '@ember/application';

export default class Ex1bRoute extends Route {
  ex1;

  constructor(owner) {
    super();
    setOwner(this, owner);
    this.ex1 = this.modelFor('app/routes/ex1');
    console.log('ex1 : ' + this.ex1);
  }

  model() {
    return this.ex1;
  }
}
