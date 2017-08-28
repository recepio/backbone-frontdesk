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
      if (event.shiftKey) {
        const beginPosition = this.collection.indexOf(this.selection.current);
        const endPosition = this.collection.indexOf(childView.model);
        console.log(beginPosition, endPosition);
        for (let i = Math.min(beginPosition, endPosition); i <= Math.max(beginPosition, endPosition); i++) {
          this.selection.select(this.collection.at(i), false);
        }
      }
      this.selection.select(childView.model, false);
    }
  },

  onCurrent(model, isSelected) {
    console.log('onCurrent', isSelected);
    if (model) {
      this.children.findByModel(model).setCurrent(isSelected);
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
