import Marionette from 'backbone.marionette';
import CheckCollection from '../collections/CheckCollection';
import CheckCollectionView from './CheckCollectionView';
import template from '../templates/layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    checks: '.checks'
  },

  initialize() {
    this.checkCollection = new CheckCollection;
    this.checkCollectionView = new CheckCollectionView({
      collection: this.checkCollection
    });
  },

  onRender() {
    this.showChildView('checks', this.checkCollectionView);

    this.checkCollection.fetch();
    if (!this.checkCollection.length) {
      for (let i = 0; i < 100; i++) {
        this.checkCollection.create();
      }
    }
  }
});
