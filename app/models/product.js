import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') price;
  @attr('string') image;
  @attr('string') comments;
  @attr('number') stock;
  @attr('number') promotion;
  @belongsTo('section') section;
  @hasMany('product', { inverse: null }) packs;
}
