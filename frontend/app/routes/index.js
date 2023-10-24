import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service store;

    model() {
        return this.store.findAll('artwork');
    }

    /* model() {
        return this.store.query('artwork', {
            include: 'artist'
        });
    } */
}