import TableView from './TableView';
import ServiceCollectionView from './ServiceCollectionView';
import template from '../templates/services.jst';

export default TableView.extend({
  template: template,

  onRender: function() {
    this.showChildView('body', new ServiceCollectionView({
      collection: this.collection
    }));
  }
});
