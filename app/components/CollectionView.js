import Marionette from 'backbone.marionette';
import SelectionCollection from '../collections/SelectionCollection';

export default Marionette.CollectionView.extend({
  selectionCollection: new SelectionCollection,
  collectionEvents: {
    remove: 'removed'
  },

  initialize() {
    this.listenTo(this.selectionCollection, 'add', this.addedSelection);
  },

  onChildviewSelectItem(childView) {
    this.selectionCollection.add({view: childView});
  },

  addedSelection(model) {
    model.get('view').$el.toggleClass('selected', true);
  },

  removed(model) {
    const foundModel = this.selectionCollection.find(selectionModel => selectionModel.get('view').model === model);
    if (foundModel) {
      foundModel.destroy();
    }
  }
});
