import Model, { attr } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string') name;
  @attr('string') nickname;
  @attr('string') password;
  @attr('string') passwordConfirmation;
}
