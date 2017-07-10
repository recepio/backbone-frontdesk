import Collection from '../core/Collection';
import {LocalStorage} from 'backbone.localstorage';
import Service from '../models/Service';

export default Collection.extend({
  model: Service,
  localStorage: new LocalStorage('services')
});
