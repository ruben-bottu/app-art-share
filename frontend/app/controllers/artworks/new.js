import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const allowedTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];

export default class ArtworksNewController extends Controller {
  @tracked title = '';
  @tracked artistName = '';
  @tracked artType = '';
  @tracked description = '';

  @tracked statusMessage = '';
  @tracked titleError = '';
  @tracked artistNameError = '';
  @tracked artTypeError = '';
  @tracked descriptionError = '';
  @tracked dropzoneError = '';

  @tracked artImage = '';
  @tracked preview = '';

  @service store;

  clearErrors() {
    this.statusMessage = '';
    this.titleError = '';
    this.artistNameError = '';
    this.artTypeError = '';
    this.descriptionError = '';
    this.dropzoneError = '';
  }

  isValidTextInput(text) {
    return text && text.trim() !== '';
  }

  validate() {
    let result = true;

    if (!this.title || this.title.trim() === '') {
      this.titleError = `Title required`;
      result = false;
    }

    if (!this.artistName || this.artistName.trim() === '') {
      this.artistNameError = `Artist name is required`;
      result = false;
    }

    if (!this.artType || this.artType.trim() === '') {
      this.artTypeError = `Artform is required`;
      result = false;
    }

    if (!this.description || this.description.trim() === '') {
      this.descriptionError = `Description is required`;
      result = false;
    }

    return result;
  }

  @action
  async createArtwork(event) {
    event.preventDefault();
    this.clearErrors();

    if (!this.validate()) {
      return;
    }

    const artist = this.store.createRecord('artist', {
      name: this.artistName,
    });
    await artist.save();

    const artwork = this.store.createRecord('artwork', {
      title: this.title,
      artType: this.artType,
      description: this.description,
      artist: artist,
    });
    artwork.save();

    this.statusMessage = `Creation successful`;
  }
}
