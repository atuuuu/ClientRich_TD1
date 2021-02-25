import Route from '@ember/routing/route';

export default class ContactRoute extends Route {
  @attr ( "string" ) nom;
  @attr ( "string" ) prenom;
  @attr ( "string" ) mail;

  constructor(nom, prenom, mail) {
    super();
    this.nom = nom
    this.prenom = prenom
    this.mail = mail
  }
}
