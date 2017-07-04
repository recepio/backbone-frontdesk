import ItemView from './ItemView';
import template from '../templates/checkitem.jst';

export default ItemView.extend({
  tagName: 'tr',
  template: template,
  events: {
    'click .remove': 'onRemove'
  },

  onRemove() {
    this.model.destroy();
  }
});
