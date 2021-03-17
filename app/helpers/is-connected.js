import { helper } from '@ember/component/helper';
import { inject as service } from '@ember/service';


export default helper(function isConnected(params) {
  console.log(params);
  if(!params[0]) {
    return 'Déconnexion';
  } else {
    return 'Se connecter';
  }
});
