import Marionette from 'backbone.marionette';
import CheckCollection from '../collections/CheckCollection';
import HeaderView from './HeaderView';
import CheckTableView from './CheckTableView';
import Selection from '../core/Selection';
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
    this.selection = new Selection;
    this.checkTableView1 = new CheckTableView({
      collection: this.checkCollection,
      selection: this.selection
    });
    this.checkTableView2 = new CheckTableView({
      collection: this.checkCollection,
      selection: this.selection
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
    const model = this.checkCollection.create();
    this.selection.select(model);
  },

  removeItem() {
    let model;
    while (model = this.selection.getSelected().first()) {
      model.destroy();
    }
  },

  onChildviewCreateItem() {
    this.createItem();
  },

  onChildviewRemoveItem() {
    this.removeItem();
  }
});
