import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service(),

  actions: {
    /**
     * standard save action
     * @param model
     * @returns {boolean}
     */
    save: function (model) {
      console.log('save called in route');
      return model.save();
    }
  }
});
