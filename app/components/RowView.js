import ItemView from './ItemView';

export default ItemView.extend({
  tagName: 'tr',
  events: {
    'click .remove': 'onRemove'
  },

  onRemove() {
    this.model.destroy();
  }
});
