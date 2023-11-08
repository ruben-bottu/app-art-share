import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('registration', { path: '/register' });
  this.route('login');
  this.route('authenticated', { path: '' }, function () {
    // all routes that require the session to be authenticated
    this.route('artworks', function () {
      this.route('new');
    });
    this.route('profile');
  });
});
