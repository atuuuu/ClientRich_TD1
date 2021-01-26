import Route from '@ember/routing/route';
import Ex1Route from './ex1';

export default class Ex1bRoute extends Route {
  get list() {
    return '<li class="list-group-item"> ' + Ex1Route.items[0] + '</li>li>';
  }
}
