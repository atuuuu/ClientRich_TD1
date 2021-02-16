import Route from '@ember/routing/route';
import Step from "../class/Step";
import data from "../class/data";

export default class Step1Route extends Route {

  step;

  model() {
    this.step = new Step();
    return this.step;
  }

  setupController(controller, model, transition) {
    console.log("Coucou");
    controller.dispoItems.forEach(value => {
      console.log(value);
    })
  }
}
