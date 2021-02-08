import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { datas } from "../data/datas";

export default class Ex2Controller extends Controller {
  @tracked serviceActifs = "1";
  @tracked prix = 0;

  constructor() {
    super();
    this.calculPrice();
  }

  @action
  toggleService(service) {
    var c = 0
    datas.forEach(value => {
      if(value.active === true) this.prix += value.price;

      if (value.name === service) {
        value.active = !value.active;
      }
      if(value.active === true)
        c++;

      this.serviceActifs = c;
    });
    this.calculPrice()
  }

  calculPrice() {
    var tmp = 0;
    datas.forEach(value => {
      if(value.active === true) tmp += value.price;
    });
    this.prix = tmp;
  }
}
