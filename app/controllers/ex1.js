import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const MAX = 100;

export default class Ex1Controller extends Controller {
  @tracked content = 'Entrez votre texte';
  @tracked info = 'hidden';
  @tracked note = 'alert-info';
  @tracked status = '';

  items = [];

  get size() {
    return MAX - this.content.length;
  }

  get style() {
    return this.info;
  }

  @action
  clear() {
    this.content = '';
    this.update();
  }

  @action
  update() {
    this.status = 'Note modifiée';
    this.note = 'alert-info';
    this.info = 'alert-info';
    if (this.content === '') {
      this.status = '';
      this.info = 'hidden';
    } else if (this.content.length >= 50 && this.content.length < 80) {
      this.note = 'alert-warning';
    } else if (this.content.length >= 80) {
      this.note = 'alert-danger';
    }
  }

  set items(content) {
    content.split('\n').forEach((value) => {
      this.items[this.items.length] = value;
    });
  }
}
