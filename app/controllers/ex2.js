import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { datas } from "../data/datas";

export default class Ex2Controller extends Controller {
  @tracked serviceActifs = "1";
  @tracked prix = 0;
  @tracked style = [];

  constructor() {
    super();
    this.calculPrice();
    this.initiateStyle();
  }

  getStyle() {
    return ""
  }

  @action
  select(name) {
    console.log(document.getElementById(name).style.backgroundColor);
    if (document.getElementById(name).style.backgroundColor === "rgb(118, 118, 118)") {
      document.getElementById(name).style.backgroundColor = "#8EC16C";
    }
    else {
      document.getElementById(name).style.backgroundColor = "#767676";
    }
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

  initiateStyle() {
    var i = 0;
    datas.forEach(value => {
      i++;
      if(value.active === true) {
        this.style[i] = "#8EC16C";
      }
      else this.style[i] = "#767676";
    });
  }
}
