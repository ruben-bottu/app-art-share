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

  async updatePassword() {
    return this.store.createRecord('accountCurrentChangePassword', {
      oldPassword: this.oldPassword.trim(),
      newPassword: this.newPassword.trim(),
      newPasswordConfirmation: this.newPasswordConfirmation.trim(),
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
