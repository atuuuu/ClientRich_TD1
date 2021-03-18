import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service userAuth;
  @action
  openSection() {
    console.log("coucou : " + this.userAuth.isAuth);
    if(this.userAuth.isAuth)
    {
      this.transitionTo('sections');
    }
    else {
      this.transitionTo('login');
    }
  }
}
