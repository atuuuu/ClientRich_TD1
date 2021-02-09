import { helper } from '@ember/component/helper';

export default helper(function selected(params) {
  console.log(params[0])
  if(params[0]) {
    return "#8EC16C";
  }
  else return "#767676";
});
