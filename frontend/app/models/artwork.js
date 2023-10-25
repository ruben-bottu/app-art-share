import Model, { attr, belongsTo } from '@ember-data/model';

export default class ArtworkModel extends Model {
  @attr('string') title;
  @attr('string') artForm;
  @attr('string') description;
  @attr('string') imageUrl;
  @belongsTo('artist', { async: true, inverse: 'artworks' }) artist;
}
