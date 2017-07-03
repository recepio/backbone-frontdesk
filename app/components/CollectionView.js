import Marionette from 'backbone.marionette';
import SelectionCollection from '../collections/SelectionCollection';

export default Marionette.CollectionView.extend({
  selectionCollection: new SelectionCollection,

  initialize() {
    this.listenTo(this.selectionCollection, 'add', this.addedSelection);
  },

  onChildviewSelectItem(childView) {
    this.selectionCollection.add({view: childView});
  },

  addedSelection(model) {
    model.get('view').$el.toggleClass('selected', true);
  }
});
