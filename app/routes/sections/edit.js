import Route from '@ember/routing/route';

export default class SectionsEditRoute extends Route {
  secId;

  model(params) {
    this.secId = params.section_id;
    console.log(params.section_id);
    var sect = this.store.findAll('section', this.secId);
    return sect;
  }

  renderTemplate() {
    this.render({outlet: this.secId});
  }
}
