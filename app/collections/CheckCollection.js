import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';
import Check from '../models/Check';

export default Backbone.Collection.extend({
  model: Check,
  localStorage: new LocalStorage('checks')
});
