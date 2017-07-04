import Marionette from 'backbone.marionette';
import CheckCollection from '../collections/CheckCollection';
import HeaderView from './HeaderView';
import CheckTableView from './CheckTableView';
import SelectionCollection from '../collections/SelectionCollection';
import template from '../templates/check-layout.jst';

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
    this.checkTableView1 = new CheckTableView({
      collection: this.checkCollection,
      selectionCollection: this.selectionCollection
    });
    this.checkTableView2 = new CheckTableView({
      collection: this.checkCollection,
      selectionCollection: this.selectionCollection
    });
  },

  onRender() {
    this.showChildView('header', new HeaderView);
    this.showChildView('checks1', this.checkTableView1);
    this.showChildView('checks2', this.checkTableView2);

    this.checkCollection.fetch();
    if (!this.checkCollection.length) {
    }
  },

  createItem() {
    this.checkCollection.create();
  },

  removeItem() {
    const selected = this.selectionCollection.getSelected();
    _.each(selected, model => model.destroy());
  },

  onChildviewCreateItem() {
    this.createItem();
  },

  onChildviewRemoveItem() {
    this.removeItem();
  }
});
