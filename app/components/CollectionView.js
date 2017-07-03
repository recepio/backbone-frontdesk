import Marionette from 'backbone.marionette';
import SelectionCollection from '../collections/SelectionCollection';

export default Marionette.CollectionView.extend({
  collectionEvents: {
    remove: 'removed'
  },

  initialize(options) {
    this.selectionCollection = options.selectionCollection ? options.selectionCollection : new SelectionCollection;
    this.listenTo(this.selectionCollection, 'add', this.addedSelection);
  },

  onChildviewSelectItem(childView) {
    this.selectionCollection.add({model: childView.model});
  },

  addedSelection(model) {
    this.children.findByModel(model.get('model')).$el.toggleClass('selected', true);
  },

  removed(model) {
    const foundModel = this.selectionCollection.find(selectionModel => selectionModel.get('model') === model);
    if (foundModel) {
      foundModel.destroy();
    }
  }
});
