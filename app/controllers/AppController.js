import Marionette from 'backbone.marionette';
import LayoutView from '../components/LayoutView';

export default Marionette.Object.extend({
  initialize(options) {
    this.application = options.application;
    this.layout = new LayoutView;
    this.application.showView(this.layout);
  },

  showMain() {
  },

  showServices() {
    this.layout.triggerMethod('show:service:list');
  },

  showChecks(section) {
    this.layout.triggerMethod('show:check:list');
  }
});
