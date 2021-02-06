import Route from "@ember/routing/route";
import { datas, promos } from "../data/datas";
import Services from "../classes/Services";
import { tracked } from "@glimmer/tracking";

export default class Ex2Route extends Route {
  model() {
    this.services = new Services(datas);
    return this.services;
  }
}

