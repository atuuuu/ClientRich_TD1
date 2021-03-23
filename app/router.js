import EmberRouter from '@ember/routing/router';
import config from 'td1/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path : '/'});
  this.route('index', { path : '/index'});

  this.route('login');
  this.route('sections');

  this.route('products', {path : '/products'}, function() {
    this.route('add');
  });
  this.route('orders', function(id) {
    this.route('id', {path : 'orders/:order_id'});
  });
});
