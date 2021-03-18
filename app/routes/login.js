import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Abstractroute from "./Abstractroute";

export default class LoginRoute extends Abstractroute {
  @service userAuth;
  store;

  @action
  login(mail, pass) {
    let self = this;
    this.store
      .query('employee', {
        filter: {
          email: mail
        },
      }).then((connected) => {
        if (connected.length) {
          connected = connected.firstObject;
          if (connected.password && connected.password === pass) {
            this.userAuth.login(connected);
            this.transitionTo('index');
          }
        }
      });
  }
}
