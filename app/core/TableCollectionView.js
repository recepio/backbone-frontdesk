import CollectionView from './CollectionView';

export default CollectionView.extend({
  tagName: 'tbody',
  events: {
    'keydown': 'onKeydown'
  },

  getPreviousModel(current) {
    let position = this.collection.indexOf(current);
    position--;
    if (position > -1) {
      return this.collection.at(position);
    }
  },

  getNextModel(current) {
    let position = this.collection.indexOf(current);
    position++;
    if (position < this.collection.length) {
      return this.collection.at(position);
    }
  },

  onKeydown(event) {
    console.log(event.which);
    if (this.selection) {
      if ([38, 40].includes(event.which)) {
        let current = this.selection.current;
        if (event.which === 38) {
          current = this.getPreviousModel(current);
        } else if (event.which === 40) {
          current = this.getNextModel(current);
        }
        if (current) {
          this.selection.select(current);
          event.preventDefault();
        }
      }
    }
  }
});
