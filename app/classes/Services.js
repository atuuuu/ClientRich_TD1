export default class Services {
  services = [];

  constructor(serv) {
    this.services = serv;
  }

  get countActive() {
    return this.services.filterBy('active', true).length;
  }

  get sumActive() {
    val = 0;
    this.services.forEach(value => {
      val += value.price;
    });

    return val;
  }
}
