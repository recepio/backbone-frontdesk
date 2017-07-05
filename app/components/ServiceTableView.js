import TableView from '../core/TableView';
import ServiceCollectionView from './ServiceCollectionView';
import template from '../templates/services.jst';

export default TableView.extend({
  template: template,

  onRender: function() {
    this.showChildView('body', new ServiceCollectionView({
      collection: this.collection,
      selection: this.options.selection
    }));
  }
});
