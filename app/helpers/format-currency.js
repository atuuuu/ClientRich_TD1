import { helper } from '@ember/component/helper';

function formatCurreny(value, symbol) {
  value = value * 100;
  value = (int)(value);
  value = (double)(value/100);

  retour = value + symbol;
  return retour;
}

export default helper(formatCurreny);

