import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults() {
    return {
      start: new Date()
    }
  }
});
