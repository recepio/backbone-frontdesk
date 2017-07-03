import Marionette from 'backbone.marionette';
import template from '../templates/header.jst';

export default Marionette.View.extend({
  template: template,
  triggers: {
    'click .create': 'create:item',
    'click .remove': 'remove:item'
  }
});
