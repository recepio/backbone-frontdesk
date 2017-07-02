import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import LayoutView from './LayoutView';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new LayoutView());
    Backbone.history.start();
  }
});
