import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CreateArtworkController extends Controller {
    @tracked newTitle = '';
    @tracked newArtType = '';
    @tracked newDescription = '';

    @service store;

    @action
    createArtwork(event) {
      event.preventDefault();
      // create the new artwork
      const artwork = this.store.createRecord('artwork', {
        title: this.newTitle,
        artType: this.newArtType,
        description: this.newDescription,
      });
      artwork.save();
      // clear the input fields
      this.newTitle = '';
      this.newArtType = '';
      this.newDescription = '';
    }
}
