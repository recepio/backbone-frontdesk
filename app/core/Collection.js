import Backbone from 'backbone';

export default Backbone.Collection.extend({
  remove(model) {
    this.trigger('beforeRemove', model);
    return Backbone.Collection.prototype.remove.apply(this, arguments);
  }
});
