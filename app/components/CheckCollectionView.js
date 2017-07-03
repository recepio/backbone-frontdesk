import CollectionView from './CollectionView';
import CheckItemView from './CheckItemView';

export default CollectionView.extend({
  childView: CheckItemView,
  tagName: 'table'
});
