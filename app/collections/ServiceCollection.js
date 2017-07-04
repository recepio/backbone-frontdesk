import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';
import Service from '../models/Service';

export default Backbone.Collection.extend({
  model: Service,
  localStorage: new LocalStorage('services')
});
