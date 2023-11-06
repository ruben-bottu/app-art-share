import Model from '@ember-data/model';

export default class AccountCurrentChangePasswordModel extends Model {
  @attr('string') oldPassword;
  @attr('string') newPassword;
  @attr('string') newPasswordConfirmation;
}
