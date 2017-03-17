import Ember from 'ember';

export default Ember.Component.extend({


  isSaving: false,

  actions: {
    /**
     * standard save action
     * @param model
     * @returns {boolean}
     */
    save: function (model) {
      console.log('save called in component');
      this.set('isSaving', true);
      var self = this;
      this.attrs.foo(model).then(function (value) {
        // on fulfillment
        console.log('component caught success');
        debugger;
      }, function (reason) {
        // on rejection
        console.log('component caught failure');
        debugger;
      }).finally(function () {
        self.set('isSaving', false);
      });

    }

  }
});
