import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service store;

    async recommendedArtworkId() {
        const rawResponse = await fetch(`/recommendations`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
        });
        const { artworkId } = await rawResponse.json();
        return artworkId;
    }

    async model() {
        const id = await this.recommendedArtworkId();
        const recommendedArtwork = await this.store.findRecord('artwork', id);

        const artworks = await this.store.query('artwork', {
            include: 'artist',
        });

        return { recommendedArtwork, artworks };
    }
}
