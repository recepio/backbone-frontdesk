import Marionette from 'backbone.marionette';

export default Marionette.AppRouter.extend({
  appRoutes: {
    '': 'showMain',
    'services': 'showServices',
    'checks/:section': 'showChecks'
  }
});
