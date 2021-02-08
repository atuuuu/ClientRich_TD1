import { helper } from '@ember/component/helper';

function formatCurreny(param) {
  var value = param[0];
  var symbol = param[1];
  value = value * 100;
  value = Math.round(value);
  value = (value/100);

  var retour = value + symbol;
  return retour;
}

export default helper(formatCurreny);

