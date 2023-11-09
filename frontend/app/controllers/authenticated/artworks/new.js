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

    @tracked artImage = '';
    @tracked preview = '';

    @tracked titleError = '';
    @tracked artistNameError = '';
    @tracked artFormError = '';
    @tracked descriptionError = '';
    @tracked dropzoneError = '';

    @service store;
    @service router;
    @service fileQueue;
    @service notify;

    clearErrors() {
        /* this.titleError = '';
    this.artistNameError = '';
    this.artFormError = '';
    this.descriptionError = '';
    this.dropzoneError = ''; */
    }

    clearInputFields() {
        this.title = '';
        this.artistName = '';
        this.artForm = '';
        this.description = '';
        this.artImage = '';
        this.preview = '';
    }

    isValidTextInput(text) {
        return text && text.trim() !== '';
    }

    isFormValid(fields) {
        return fields.reduce((acc, currentField) => {
            if (!currentField.errorMessage)
                throw Error('errorMessage cannot be empty');

            if (currentField.isFieldValid) {
                currentField.userFeedbackCallback('');
                return acc;
            } else {
                currentField.userFeedbackCallback(currentField.errorMessage);
                return false;
            }
        }, true);
    }

    validate() {
        const textItem = (inputValue, errorMessage, userFeedbackCallback) => {
            return {
                isFieldValid: this.isValidTextInput(inputValue),
                errorMessage,
                userFeedbackCallback,
            };
        };

        const fields = [
            textItem(
                this.title,
                `Title is required`,
                (m) => (this.titleError = m)
            ),
            textItem(
                this.artistName,
                `Artist name is required`,
                (m) => (this.artistNameError = m)
            ),
            textItem(
                this.artForm,
                `Art form is required`,
                (m) => (this.artFormError = m)
            ),
            textItem(
                this.description,
                `Description is required`,
                (m) => (this.descriptionError = m)
            ),
            {
                isFieldValid: this.preview,
                errorMessage: `Please upload a valid image`,
                userFeedbackCallback: (m) => (this.dropzoneError = m),
            },
        ];

        return this.isFormValid(fields);
    }

    async uploadArtImage() {
        try {
            const response = await this.artImage.upload('/files');
            return await response.json();
        } catch (error) {
            this.notify.error(`File upload failed: ${error.message}`);
        }
    }

    async createArtist() {
        const artist = this.store.createRecord('artist', {
            name: this.artistName.trim(),
        });
        await artist.save();
        return artist;
    }

    async createArtwork(artImageLocation, artist) {
        const artwork = this.store.createRecord('artwork', {
            title: this.title.trim(),
            artForm: this.artForm.trim(),
            description: this.description.trim(),
            imageUrl: `${artImageLocation}/download`,
            artist: artist,
        });
        await artwork.save();
        return artwork;
    }

    @action
    async handleCreateArtwork(event) {
        event.preventDefault();
        this.clearErrors();

        if (!this.validate()) return;

        const artImageResponse = await this.uploadArtImage();
        const artist = await this.createArtist();
        await this.createArtwork(artImageResponse.links.self, artist);

        this.clearInputFields();
        this.notify.success(`Creation successful`);
        this.router.transitionTo('index');
    }

    get queue() {
        return this.fileQueue.findOrCreate('artImages');
    }

    @action
    async setArtImage(file) {
        this.preview = await file.readAsDataURL();
        this.artImage = file;
        // Remove previous item from queue
        this.queue.files
            .slice(0, -1)
            .forEach((fileItem) => this.queue.remove(fileItem));
    }

    @action
    validateFile(file) {
        return allowedTypes.includes(file.type);
    }
}
