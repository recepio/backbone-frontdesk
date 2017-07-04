import Marionette from 'backbone.marionette';
import SelectionCollection from '../collections/SelectionCollection';

export default Marionette.CollectionView.extend({
  collectionEvents: {
    remove: 'removed'
  },

  initialize(options) {
    this.selectionCollection = options.selectionCollection ? options.selectionCollection : new SelectionCollection;
    this.listenTo(this.selectionCollection, 'add', this.addedSelection);
    this.listenTo(this.selectionCollection, 'remove', this.removedSelection);
  },

  onChildviewSelectItem(childView) {
    let model;
    while (model = this.selectionCollection.first()) {
      model.destroy();
    }
    this.selectionCollection.add({model: childView.model});
  },

  addedSelection(model) {
    this.children.findByModel(model.get('model')).setSelected(true);
  },

  removedSelection(model) {
    console.log('removed');
    this.children.findByModel(model.get('model')).setSelected(false);
  },

  removed(model) {
    const foundModel = this.selectionCollection.find(selectionModel => selectionModel.get('model') === model);
    if (foundModel) {
      foundModel.destroy();
    }
  }
});
