import data from "../class/data";
import { tracked } from '@glimmer/tracking';

export default class Step {
  @tracked items;

  constructor() {
    this.items = data;
  }
}
