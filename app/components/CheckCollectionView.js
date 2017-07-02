import Marionette from 'backbone.marionette';
import CheckItemView from './CheckItemView';

export default Marionette.CollectionView.extend({
  childView: CheckItemView,
  tagName: 'table'
});
