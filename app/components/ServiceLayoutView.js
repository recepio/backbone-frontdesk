import Marionette from 'backbone.marionette';
import ServiceCollection from '../collections/ServiceCollection';
import HeaderView from './HeaderView';
import ServiceTableView from './ServiceTableView';
import SelectionCollection from '../collections/SelectionCollection';
import template from '../templates/service-layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    header: 'header',
    services: '.services'
  },

  initialize() {
    this.serviceCollection = new ServiceCollection;
    this.selectionCollection = new SelectionCollection;
    this.serviceTableView = new ServiceTableView({
      collection: this.serviceCollection,
      selectionCollection: this.selectionCollection
    });
  },

  onRender() {
    this.showChildView('header', new HeaderView);
    this.showChildView('services', this.serviceTableView);

    this.serviceCollection.fetch();
    if (!this.serviceCollection.length) {
    }
  },

  createItem() {
    this.serviceCollection.create();
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
