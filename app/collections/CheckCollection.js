import Collection from '../core/Collection';
import {LocalStorage} from 'backbone.localstorage';
import Check from '../models/Check';

export default Collection.extend({
  model: Check,
  localStorage: new LocalStorage('checks')
});
