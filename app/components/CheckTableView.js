import TableView from '../core/TableView';
import CheckCollectionView from './CheckCollectionView';
import template from '../templates/checks.jst';

export default TableView.extend({
  template: template,

  onRender: function() {
    this.showChildView('body', new CheckCollectionView({
      collection: this.collection,
      selection: this.options.selection
    }));
  }
});
