import Marionette from 'backbone.marionette';

export default Marionette.CollectionView.extend({
  collectionEvents: {
    beforeRemove: 'onBeforeRemove'
  },

  initialize(options) {
    if (options.selection) {
      this.selection = options.selection;
      this.selection.collection = this.collection;
      this.listenTo(this.selection, 'current', this.onCurrent);
      this.listenTo(this.selection, 'select', this.onSelect);
    }
  },

  onChildviewClickItem(childView, event) {
    if (this.selection) {
      if (!event.ctrlKey) {
        let model;
        while (model = this.selection.getSelected().first()) {
          this.selection.deselect(model);
        }
      }
      this.selection.select(childView.model);
    }
  },

  onCurrent(model) {
    console.log('onCurrent');
    if (model) {
      this.children.findByModel(model).setCurrent();
    }
  },

  onSelect(model, selected) {
    console.log('onSelect', selected);
    this.children.findByModel(model).setSelected(selected);
  },

  onBeforeRemove(model) {
    if (this.selection) {
      this.selection.deselect(model);
    }
  }
});
