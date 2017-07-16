import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({
  initialize(options) {
    this.selection = [];
  },

  select(model, clear = true) {
    if (clear) {
      this.clear();
    }
    this.current = model;
    this.triggerMethod('current', model);
    if (model) {
      this.selection.push(model);
      this.triggerMethod('select', model, true);
    }
  },

  deselect(model) {
    const i = this.selection.indexOf(model);
    if (i !== -1) {
      this.selection.splice(i, 1);
    }
    this.triggerMethod('select', model, false);
  },

  clear() {
    for (const model of this.selection) {
      this.triggerMethod('select', model, false);
    }
    this.selection = [];
  },

  getSelected() {
    return _(this.selection);
  }
});
