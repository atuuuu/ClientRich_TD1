import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Abstractroute extends Route {
  @service userAuth;

  redirect() {
    if (this.userAuth.isAuth) {
      console.log("Transition to index")
      this.transitionTo('index');
    }
    else {
      this.transitionTo('login');
    }
  }
}
