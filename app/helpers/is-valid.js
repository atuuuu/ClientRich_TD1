import { helper } from '@ember/component/helper';

export default helper(function isValid(params/*, hash*/) {
  return params[0] === params[1];
});
