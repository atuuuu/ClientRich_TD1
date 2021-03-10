import Model, { attr, belongsTo } from '@ember-data/model';

export default class ContactModel extends Model {
  @attr ('string') category;
  @attr ( "string" ) nom;
  @attr ( "string" ) prenom;
  @attr ( "string" ) mail;
}