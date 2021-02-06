import { helper } from '@ember/component/helper';

function plural(count) {

  if(count[0] > 1) {
    return count[1] + 's';
  }
  else {
    return count[1];
  }
}

export default helper(plural);
