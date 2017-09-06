import Marionette from 'backbone.marionette';

export default Marionette.CollectionView.extend({
  collectionEvents: {
    beforeRemove: 'onBeforeRemove',
    remove: 'onRemove'
  },

  initialize(options) {
    if (options.selection) {
      this.removedIndex = -1;
      this.selection = options.selection;
      this.listenTo(this.selection, 'current', this.onCurrent);
      this.listenTo(this.selection, 'select', this.onSelect);
    }
  },

  onRender() {
    this.selection.getSelected().each(model => this.onSelect(model, true));
    if (this.selection.current) {
      this.onCurrent(this.selection.current, true);
    }
  },

  onChildviewClickItem(childView, event) {
    if (this.selection) {
      if (!event.ctrlKey && !event.metaKey) {
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
    const childView = this.children.findByModel(model);
    if (childView) {
      childView.setCurrent(isSelected);
    }
  },

  onSelect(model, selected) {
    console.log('onSelect', selected);
    const childView = this.children.findByModel(model);
    if (childView) {
      childView.setSelected(selected);
    }
  },

  onBeforeRemove(model) {
    if (this.selection) {
      this.selection.deselect(model);
      const childView = this.children.findByModel(model);
      if (childView) {
        for (let i = 0; i < this.children.length; i++) {
          if (this.children.findByIndex(i) === childView) {
            this.removedIndex = i;
            break;
          }
        }
      }
    }
  },

  onRemove(model, collection, options) {
    if (this.selection) {
      _.defer(() => {
        if (this.removedIndex >= this.children.length) {
          this.removedIndex = this.children.length - 1;
        }
        const current = this.children.length ? this.children.findByIndex(this.removedIndex).model : null;
        this.selection.select(current);
      });
    }
  }
});
