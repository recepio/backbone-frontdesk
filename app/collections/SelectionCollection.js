import Backbone from 'backbone';
import Range from '../models/Range';

export default Backbone.Collection.extend({
  model: Range,

  getSelected() {
    return this.map(model => model.get('model'));
  }
});
