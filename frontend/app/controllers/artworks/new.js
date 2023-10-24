import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ArtworksNewController extends Controller {
    @tracked newTitle = '';
    @tracked newArtType = '';
    @tracked newDescription = '';
    @tracked newArtistName = '';

    @service store;

    @action
    async createArtwork(event) {
      event.preventDefault();

      const artist = this.store.createRecord('artist', {
        name: this.newArtistName,
      });

      await artist.save();

      const artwork = this.store.createRecord('artwork', {
        title: this.newTitle,
        artType: this.newArtType,
        description: this.newDescription,
        artist: artist,
      });

      artwork.save();

      // clear the input fields
      this.newTitle = '';
      this.newArtType = '';
      this.newDescription = '';
      this.newArtistName = '';
    }
}
