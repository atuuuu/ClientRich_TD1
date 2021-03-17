import Model from '@ember-data/model';
import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr ('string') name;
  @attr ('string') email;
  @attr ('string') password;
  @attr ('int') id;
}
