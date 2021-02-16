import { helper } from '@ember/component/helper';

export default helper(function arrayContains(params) {
  const [items, value,prop] = params;         //Récupération des paramètres du helpeur
  let id=prop ||'id'                          //Si prop n'a pas de valeur alors id = 'id' sinon id = prop
  return items.filterBy(id,value).length > 0; //Retourne vrai si la liste contient des objets valide (objets avec une valeur), sinon faux
});
