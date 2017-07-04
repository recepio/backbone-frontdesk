import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
  tagName: 'table',
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },
});
