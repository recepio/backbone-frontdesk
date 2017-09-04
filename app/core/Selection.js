import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({
  initialize() {
    this.selection = [];
    this.current = null;
  },

  select(model, clear = true) {
    if (clear) {
      this.clear();
    }
    if (this.current) {
      this.triggerMethod('current', this.current, false);
    }
    this.current = model;
    if (model) {
      this.triggerMethod('current', model, true);
      this.selection.push(model);
      this.triggerMethod('select', model, true);
    }
  },

  deselect(model) {
    if (this.current === model) {
      this.triggerMethod('current', this.current, false);
      this.current = null;
    }
    const i = this.selection.indexOf(model);
    if (i !== -1) {
      this.selection.splice(i, 1);
    }
    this.triggerMethod('select', model, false);
  },

  clear() {
    this.selection.forEach(model => this.triggerMethod('select', model, false));
    this.selection = [];
  },

  getSelected() {
    return _(this.selection);
  }
});
