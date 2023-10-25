import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const allowedTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];

export default class ArtworksNewController extends Controller {
  @tracked title = '';
  @tracked artistName = '';
  @tracked artForm = '';
  @tracked description = '';

  @tracked statusMessage = '';
  @tracked titleError = '';
  @tracked artistNameError = '';
  @tracked artFormError = '';
  @tracked descriptionError = '';
  @tracked dropzoneError = '';

  @tracked artImage = '';
  @tracked preview = '';

  @service store;
  @service router;

  // still needed for clearing statusMessage and dropzoneError
  clearErrors() {
    this.statusMessage = '';
    this.titleError = '';
    this.artistNameError = '';
    this.artFormError = '';
    this.descriptionError = '';
    this.dropzoneError = '';
  }

  clearInputFields() {
    this.title = '';
    this.artistName = '';
    this.artForm = '';
    this.description = '';
  }

  isValidTextInput(text) {
    return text && text.trim() !== '';
  }

  /* validate() {
    let result = true;

    if (!this.isValidTextInput(this.title)) {
      this.titleError = `Title is required`;
      result = false;
    }

    if (!this.isValidTextInput(this.artistName)) {
      this.artistNameError = `Artist name is required`;
      result = false;
    }

    if (!this.isValidTextInput(this.artForm)) {
      this.artFormError = `Art form is required`;
      result = false;
    }

    if (!this.isValidTextInput(this.description)) {
      this.descriptionError = `Description is required`;
      result = false;
    }

    return result;
  } */

  validate() {
    const fields = [
      {
        fieldName: 'title',
        isFieldValid: this.isValidTextInput,
        errorMessage: `Title is required`,
      },
      {
        fieldName: 'artistName',
        isFieldValid: this.isValidTextInput,
        errorMessage: `Artist name is required`,
      },
      {
        fieldName: 'artForm',
        isFieldValid: this.isValidTextInput,
        errorMessage: `Art form is required`,
      },
      {
        fieldName: 'description',
        isFieldValid: this.isValidTextInput,
        errorMessage: `Description is required`,
      },
    ];

    const isFormValid = fields.reduce((acc, currentField) => {
      const fieldName = currentField.fieldName;
      /* if (!this.hasOwnProperty(fieldName))
        throw Error(`Field ${fieldName} does not exist`); */
      const errorFieldName = `${fieldName}Error`;

      if (currentField.isFieldValid(this[fieldName])) {
        this[errorFieldName] = '';
        return acc;
      } else {
        this[errorFieldName] = currentField.errorMessage;
        return false;
      }
    }, true);

    return isFormValid;
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
      artForm: this.artForm,
      description: this.description,
      artist: artist,
    });
    artwork.save();

    this.clearInputFields();
    //this.statusMessage = `Creation successful`;
    this.router.transitionTo('index');
  }
}
