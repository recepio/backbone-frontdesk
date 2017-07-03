import Marionette from 'backbone.marionette';
import CheckCollection from '../collections/CheckCollection';
import HeaderView from './HeaderView';
import CheckCollectionView from './CheckCollectionView';
import template from '../templates/layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    header: 'header',
    checks: '.checks'
  },

  initialize() {
    this.checkCollection = new CheckCollection;
    this.checkCollectionView = new CheckCollectionView({
      collection: this.checkCollection
    });
  },

  onRender() {
    this.showChildView('header', new HeaderView());
    this.showChildView('checks', this.checkCollectionView);

    this.checkCollection.fetch();
    if (!this.checkCollection.length) {
    }
  },

  createItem() {
    this.checkCollection.create();
  },

  removeItem() {
    const selectedChecks = this.checkCollectionView.selectionCollection.getSelected();
    this.checkCollection.remove(selectedChecks);
    console.log(selectedChecks.length);
  },

  onChildviewCreateItem() {
    this.createItem();
  },

  onChildviewRemoveItem() {
    this.removeItem();
  }
});
