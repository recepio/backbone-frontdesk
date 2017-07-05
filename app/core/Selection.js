import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({
  initialize(options) {
    this.selection = [];
  },

  select(model) {
    this.current = model;
    this.triggerMethod('current', model);
    this.selection.push(model);
    this.triggerMethod('select', model, true);
  },

  deselect(model) {
    const i = this.selection.indexOf(model);
    if (i !== -1) {
      if (this.current === model) {
        let position = this.collection.indexOf(model) - 1;
        if (position < 0) {
          position = 0;
        }
        this.current = this.collection.length ? this.collection.at(position) : null;
        this.triggerMethod('current', this.current);
      }
      this.selection.splice(i, 1);
    }
    this.triggerMethod('select', model, false);
  },

  getSelected() {
    return _(this.selection);
  }
});
