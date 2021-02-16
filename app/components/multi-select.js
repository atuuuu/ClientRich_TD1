import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class MultiSelectComponent extends Component {
  @tracked elements = [];                                                                                               //Liste des éléments, si elle est mise à jour l'affichage aussi
  selected = [];                                                                                                        //Liste des éléments selectionnés
  id = 'id';                                                                                                            //Id par défaut

  constructor() {                                                                                                       //Constructeur
    super(...arguments);                                                                                                //
    console.log(this.args);
    this.elements = this.args.elements;                                                                                 //
    this.selected = this.args.selected;                                                                                 //
    this.id = this.args.identifier || 'id';                                                                             //Si args.identifier a une valeur, id = args.identifier sinon id = 'id'
  }

  @action
  change(event) {                                                                                                       //Action impliquant le changement d'un service
    let select = event.target;                                                                                          //Retient l'événement selectionné (sur lequel s'effectue le changement
    var selectedIds = [...select.selectedOptions].map(option => option.value);                                          //Construit une Map qui associe les options à leur êtat
    if (this.args.onChange) {                                                                                           //
      this.args.onChange(this.elements.filter(elm => selectedIds.filter(e => e == elm[this.id]).length > 0));           //Associe à onChange true si le nombre d'éléments changés est supérieur à 0, sinon y associe false
    }
  }
}
