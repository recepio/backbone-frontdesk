import Marionette from 'backbone.marionette';
import template from '../templates/checkitem.jst';

export default Marionette.View.extend({
  tagName: 'tr',
  template: template
});
