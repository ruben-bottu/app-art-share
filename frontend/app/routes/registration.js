import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegistrationRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.prohibitAuthentication('index');
  }
}
