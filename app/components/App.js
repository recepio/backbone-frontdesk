import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import AppController from '../controllers/AppController';
import AppRouter from '../routes/AppRouter';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    const controller = new AppController({
      application: this
    });
    controller.router = new AppRouter({
      controller: controller
    });

    $(document).on('click', 'a[href^=\'/\']', (event) => {
      const href = $(event.currentTarget).attr('href');
      // chain 'or's for other black list routes
      const passThrough = href.indexOf('sign_out') >= 0;
      // Allow shift+click for new tabs, etc.
      if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        // Remove leading slashes and hash bangs (backward compatablility)
        const url = href.replace(/^\//, '').replace('\#\!\/', '');
        // Instruct Backbone to trigger routing events
        controller.router.navigate(url, {trigger: true});
        return false;
      }
    });

    Backbone.history.start({pushState: true});
  }
});
