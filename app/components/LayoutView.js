import Marionette from 'backbone.marionette';
import CheckCollection from '../collections/CheckCollection';
import HeaderView from './HeaderView';
import CheckCollectionView from './CheckCollectionView';
import SelectionCollection from '../collections/SelectionCollection';
import template from '../templates/layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    header: 'header',
    checks1: '.checks1',
    checks2: '.checks2'
  },

  initialize() {
    this.checkCollection = new CheckCollection;
    this.selectionCollection = new SelectionCollection;
    this.checkCollectionView1 = new CheckCollectionView({
      collection: this.checkCollection,
      selectionCollection: this.selectionCollection
    });
    this.checkCollectionView2 = new CheckCollectionView({
      collection: this.checkCollection,
      selectionCollection: this.selectionCollection
    });
  },

  onRender() {
    this.showChildView('header', new HeaderView());
    this.showChildView('checks1', this.checkCollectionView1);
    this.showChildView('checks2', this.checkCollectionView2);

    this.checkCollection.fetch();
    if (!this.checkCollection.length) {
    }
  },

  createItem() {
    this.checkCollection.create();
  },

  removeItem() {
    const selectedChecks = this.selectionCollection.getSelected();
    _.each(selectedChecks, model => model.destroy());
  },

  onChildviewCreateItem() {
    this.createItem();
  },

  onChildviewRemoveItem() {
    this.removeItem();
  }
});
