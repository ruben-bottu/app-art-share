import Model, { attr } from '@ember-data/model';

export default class ArtworkModel extends Model {
  @attr('string') title;
  @attr('string') artType;
  @attr('string') description;
  @attr('string') imageUrl;
}
