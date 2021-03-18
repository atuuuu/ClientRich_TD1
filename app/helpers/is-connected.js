import { helper } from '@ember/component/helper';
import { inject as service } from '@ember/service';


export default helper(function isConnected(params) {
  let tmp = 'Déconnexion'
  if(params[0]) {
    tmp = "Connexion";
  }
  return tmp;

});
