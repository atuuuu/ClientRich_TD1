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
    this.route('add');
    this.route('edit', { path : 'edit/:section_id' }, function() {
      this.route('addProduct');
      this.route('edit', { path : '/edit/:product_id' }, function() {
        this.route('delete');
      });
    });
    this.route('delete', { path : 'delete/:section_id' });
  });

  this.route('products', function() {
    this.route('add');
  });
  this.route('orders', function() {
    this.route('id', { path : '/:order_id' })
  });
});
