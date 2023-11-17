import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RegistrationController extends Controller {
    @tracked name = '';
    @tracked nickname = '';
    @tracked password = '';
    @tracked passwordConfirmation = '';

    @service store;
    @service router;
    @service notify;

    clearInputFields() {
        this.name = '';
        this.nickname = '';
        this.password = '';
        this.passwordConfirmation = '';
    }

    async registerAccount() {
        const account = this.store.createRecord('account', {
            name: this.name.trim(),
            nickname: this.nickname.trim(),
            password: this.password.trim(),
            passwordConfirmation: this.passwordConfirmation.trim(),
        });
        await account.save();
        return account;
    }

    @action
    async register(event) {
        event.preventDefault();

        // TODO add validation
        const account = await this.registerAccount();
        this.clearInputFields();
        this.notify.success(`Registration successful`);
        this.router.transitionTo('login');
    }
}
