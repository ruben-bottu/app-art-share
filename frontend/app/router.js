import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
// TODO use a /artworks/new sub soute
Router.map(function () {
  this.route('artworks');
  this.route('createArtwork', { path: '/create-artwork'});
}); 
