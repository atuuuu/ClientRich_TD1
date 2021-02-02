import Controller from '@ember/controller';

export default class Ex1bController extends Controller {
  model() {
    return { val: this.modelFor('ex1') };
  }
}
