
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "section",
  // The page we are currently on

  page: 1,
  // The number of items to show per page

  paginateBy: 10,
  // Returns the list of items for the current page only

  paginatedItems: Ember.computed('items', 'page', function () {
    var i = (parseInt(this.get('page')) - 1) * parseInt(this.get('paginateBy'));
    var j = i + parseInt(this.get('paginateBy'));
    return this.get('items').slice(i, j);
  }),


  numberOfPages: Ember.computed('page', function () {
    var n = this.get('items.length');
    var c = parseInt(this.get('paginateBy'));
    var r = Math.floor(n / c);
    if (n % c > 0) {
      r += 1;
    }
    return r;
  }),


  pageNumbers: Ember.computed('numberOfPages', function () {
    var n = Array(this.get('numberOfPages'));
    for (var i = 0; i < n.length; i++) {
      n[i] = i + 1;
    }
    return n;
  }),


  showNext: Ember.computed('page', function () {
    return (this.get('page') < this.get('numberOfPages'));
  }),


  showPrevious: Ember.computed('page', function () {
    return (this.get('page') > 1);
  }),

  nextText: 'Next page',


  previousText: 'Previous page',
  actions: {


    nextClicked() {
      if (this.get('page') + 1 <= this.get('numberOfPages')) {
        this.set('page', this.get('page') + 1);
      }
    },


    previousClicked() {
      if (this.get('page') > 0) {
        this.set('page', this.get('page') - 1);
      }
    },

    pageClicked(pageNumber) {
      this.set('page', pageNumber);
    }
  }
});