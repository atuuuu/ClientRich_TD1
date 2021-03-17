import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationRoute extends Route {
  @service userAuth;
  @tracked isLogedIn = this.userAuth.isAuth();

  @action
  login() {
    if(!this.userAuth.isAuth)
    {
      this.transitionTo('login');
    }
    else {
      this.userAuth.logout();
    }
  }
}
