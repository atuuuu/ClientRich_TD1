import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class TimeSlotSerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {

}
