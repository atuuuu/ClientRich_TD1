import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { datas } from "../data/datas";

export default class Ex2Controller extends Controller {
  @tracked serviceActifs = "1"

  @action
  toggleService(service) {
    var c = 0
    datas.forEach(value => {
      if (value.name === service) {
        value.active = !value.active;
      }
      if(value.active === true)
        c++;

      this.serviceActifs = c;
    });
  }
}
