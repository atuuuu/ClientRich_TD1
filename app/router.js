import EmberRouter from '@ember/routing/router';
import config from 'td1/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path : '/board'});

  this.route('login', {path : '/'});
  this.route('login', {path : '/index'});
  this.route('sections', function() {
    this.route('addProduct', { path : 'addProduct/:section_id'});
    this.route('add');
  });

  this.route('products', function() {
    this.route('add');
  });
  this.route('orders', function(id) {
    this.route('id', {path : ':order_id'});
  });
});
