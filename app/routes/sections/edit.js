import Route from '@ember/routing/route';

export default class SectionsEditRoute extends Route {
  secId;

  model(params) {
    this.secId = params.section_id;
    var sect = {};
    sect.products = this.store.findAll('product');
    sect.sectId = this.secId;
    return sect;
  }

  renderTemplate() {
    this.render({outlet: this.secId});
  }

  isValid(id) {
    return this.secId == id;
  }
}
