import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
  attributes: {
    tabindex: 0
  },
  triggers: {
    'click': 'click:item'
  },

  setCurrent(isSelected) {
    this.$el.toggleClass('current', isSelected);
    if (isSelected) {
      this.$el.focus();
    }
  },

  setSelected(selected) {
    this.$el.toggleClass('selected', selected);
  }
});
