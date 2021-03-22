import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Abstractroute from "./Abstractroute";

export default class IndexRoute extends Abstractroute {
  @action
  openSection() {
    if(this.userAuth.isAuth)
    {
      this.transitionTo('sections');
    }
    else {
      this.transitionTo('login');
    }
  }
}
