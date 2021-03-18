import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Abstractroute from "./Abstractroute";

export default class ApplicationRoute extends Abstractroute {
  @service userAuth;
  @tracked isLogedIn = !this.userAuth.isAuth?"Connexion":"Deconnexion";

  willTransition(transition) {
    console.log("Transition : " + transition);
    this.isLogedIn = !this.userAuth.isAuth?"Connexion":"Deconnexion";
  }

  model() {
    return this;
  }

  @action
  login() {
    console.log(this.userAuth.isAuth);
    if(!this.userAuth.isAuth)
    {
      this.transitionTo('/login');
    }
    else {
      this.userAuth.logout();
    }
  }

  @action
  toMenu() {
    this.transitionTo('/index');
  }
}
