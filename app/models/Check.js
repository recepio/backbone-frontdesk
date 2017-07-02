import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    start: new Date()
  }
});
