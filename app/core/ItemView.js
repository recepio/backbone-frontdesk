import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
  attributes: {
    tabindex: 0
  },
  triggers: {
    'click': 'click:item'
  },

  setCurrent() {
    this.$el.focus();
  },

  setSelected(selected) {
    this.$el.toggleClass('selected', selected);
  }
});
