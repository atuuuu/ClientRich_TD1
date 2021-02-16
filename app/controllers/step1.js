import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import data from "../class/data";

export default class Step1Controller extends Controller {
  dispoItems = [];
  includedItems = [];
  @tracked disposItems_ = [];
  @tracked includeItems_ = [];

  constructor(props) {
    super(props);
  }


  @action
  changeDispo(elements) {

  }

  @action
  changeIncluded(elements) {

  }

  @action
  add(source, dest, what) {

  }

  @action
  remove(source, dest, what) {

  }

}
