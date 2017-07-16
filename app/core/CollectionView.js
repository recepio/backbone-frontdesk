import Marionette from 'backbone.marionette';

export default Marionette.CollectionView.extend({
  collectionEvents: {
    beforeRemove: 'onBeforeRemove',
    remove: 'onRemove'
  },

  initialize(options) {
    if (options.selection) {
      this.selection = options.selection;
      this.listenTo(this.selection, 'current', this.onCurrent);
      this.listenTo(this.selection, 'select', this.onSelect);
    }
  },

  onChildviewClickItem(childView, event) {
    if (this.selection) {
      if (!event.ctrlKey) {
        this.selection.clear();
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
  },

  onRemove(model, collection, options) {
    if (this.selection) {
      _.defer(() => {
        let position = options.index;
        if (position >= this.collection.length) {
          position = this.collection.length - 1;
        }
        const current = this.collection.length ? this.collection.at(position) : null;
        this.selection.select(current);
      });
    }
  }
});
