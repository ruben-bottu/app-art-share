import Model, { attr } from '@ember-data/model';

// TODO change password through Ember Data
export default class AccountCurrentChangePasswordModel extends Model {
  @attr('string') oldPassword;
  @attr('string') newPassword;
  @attr('string') newPasswordConfirmation;
}
