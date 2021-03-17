import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class UserAuthService extends Service {
  @tracked user = null;
  storage;
  constructor() {
    super();
    this.storage = sessionStorage;
    if (this.storage.user) {
      let u = JSON.parse(this.storage.user);
      set(this, 'user', u);
    }
  }

  getUser() {
    return this.user;
  }

  get isAuth() {
    return this.user !== null;
  }

  logout() {
    this.user = null;
    this.storage.removeItem('user');
    this.storage.clear();
  }
  login(user) {
    this.user = user;
    this.storage.user = JSON.stringify({ id: user.id, email: user.email });
  }
}
