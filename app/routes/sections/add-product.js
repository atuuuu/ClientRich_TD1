import Route from '@ember/routing/route';

export default class SectionsAddProductRoute extends Route {
  outletName;

  model(params) {
    this.outletName = params.name;
  }

  renderTemplate() {
    this.render({outlet: this.outletName});
  }
}
