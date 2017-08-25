import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import CheckLayoutView from './CheckLayoutView';
import ServiceLayoutView from './ServiceLayoutView';
import template from '../templates/layout.jst';

export default Marionette.View.extend({
  template: template,
  regions: {
    main: '.main-layout'
  },

  onShowCheckList: function() {
    this.showChildView('main', new CheckLayoutView);
  },

  onShowServiceList: function() {
    this.showChildView('main', new ServiceLayoutView);
    //Backbone.history.navigate('/services');
  }
});
