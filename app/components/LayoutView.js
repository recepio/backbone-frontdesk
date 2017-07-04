import Marionette from 'backbone.marionette';
import CheckLayoutView from './CheckLayoutView';
import ServiceLayoutView from './ServiceLayoutView';
import template from '../templates/layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    check: '.check-layout',
    service: '.service-layout'
  },

  onRender() {
    this.showChildView('check', new CheckLayoutView);
    this.showChildView('service', new ServiceLayoutView);
  }
});
