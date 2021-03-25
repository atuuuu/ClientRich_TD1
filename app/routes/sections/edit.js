import Route from '@ember/routing/route';

export default class SectionsEditRoute extends Route {
  secId;

  model(params) {
    this.secId = params.section_id;
    console.log(params);
  }

  renderTemplate() {
    this.render({outlet: this.secId});
  }
}
