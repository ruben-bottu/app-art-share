import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProfileController extends Controller {
  @tracked oldPassword = '';
  @tracked newPassword = '';
  @tracked newPasswordConfirmation = '';

  @service store;
  @service router;
  @service notify;
  @service session;

  clearInputFields() {
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirmation = '';
  }

  jsonApiHeaders() {
    return {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    };
  }

  async updatePassword() {
    const body = {
      data: {
        type: 'accounts',
        id: 'current',
        attributes: {
          'old-password': this.oldPassword.trim(),
          'new-password': this.newPassword.trim(),
          'new-password-confirmation': this.newPasswordConfirmation.trim(),
        },
      },
    };

    return fetch('/accounts/current/changePassword', {
      method: 'PATCH',
      headers: this.jsonApiHeaders(),
      body: JSON.stringify(body),
    });
  }

  @action
  async changePassword(event) {
    event.preventDefault();

    // TODO add validation
    await this.updatePassword();
    this.clearInputFields();
    this.notify.success(`Password changed succesfully`);
  }

  @action
  async unregister() {
    this.session.invalidate();
    await fetch('/accounts/current', {
      method: 'DELETE',
      headers: this.jsonApiHeaders(),
    });
  }
}
