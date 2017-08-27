import Marionette from 'backbone.marionette';
import ServiceCollection from '../collections/ServiceCollection';
import HeaderView from './HeaderView';
import ServiceTableView from './ServiceTableView';
import Selection from '../core/Selection';
import template from '../templates/service-layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    header: 'header',
    services: '.services'
  },
  childViewEvents: {
    'create:item': 'createItem',
    'remove:item': 'removeItem'
  },

  initialize() {
    this.serviceCollection = new ServiceCollection;
    this.selection = new Selection;
    this.serviceTableView = new ServiceTableView({
      collection: this.serviceCollection,
      selection: this.selection
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
    let model;
    while ((model = this.selection.getSelected().first())) {
      model.destroy();
    }
  }
});
