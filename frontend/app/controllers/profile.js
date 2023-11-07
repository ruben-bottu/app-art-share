import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProfileController extends Controller {
  @tracked oldPassword = '';
  @tracked newPassword = '';
  @tracked newPasswordConfirmation = '';

  @tracked statusMessage = '';

  @service store;
  @service router;

  clearErrors() {
    this.statusMessage = '';
  }

  clearInputFields() {
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirmation = '';
  }

  // TODO use Ember Data
  async updatePassword() {
    /* return this.store.updateRecord('account.current.changePassword', {
      oldPassword: this.oldPassword.trim(),
      newPassword: this.newPassword.trim(),
      newPasswordConfirmation: this.newPasswordConfirmation.trim(),
    }); */

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
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(body),
    });
  }

  @action
  async changePassword(event) {
    event.preventDefault();
    this.clearErrors();

    // TODO add validation
    await this.updatePassword();
    this.clearInputFields();
    this.statusMessage = `Password changed succesfully`;
  }
}
