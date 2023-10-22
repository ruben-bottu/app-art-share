import Model, { attr, hasMany } from '@ember-data/model';

export default class ArtistModel extends Model {
  @attr('string') name;
  @attr('string') givenName;
  @attr('string') familyName;
  @hasMany('artwork') artworks;
}
