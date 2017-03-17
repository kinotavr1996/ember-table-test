import Ember from 'ember';

export default Ember.Controller.extend({
    sortProperty: 'age',
    filterProperty: '',
    reverseSort: false,

    sortedArray: Ember.computed.sort('model', 'sortDefinition'),

    sortDefinition: Ember.computed('sortProperty', 'reverseSort', 'filterProperty', function () {
        let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
        return [`${this.get('sortProperty')}:${sortOrder}`];
    }),
    filteredArray: function () {
        var filter = this.get('filter');
        console.log(filter);
        var regExPattern = '\\b' + filter + '\\b';
        var regexp = new RegExp(regExPattern, 'gi');
        if(filter == '' || filter == null)
            return this.get('sortedArray');
            else
        return this.get('model').filter(function (place) {
            return place.get('name').match(regexp);
        });
    }.property('filterProperty'),
    actions: {
        sortBy: function (property) {
            this.set('sortProperty', property);
            if (this.get('reverseSort'))
                this.set('reverseSort', false)
            else
                this.set('reverseSort', true);

        },
        autocomplete: function () {
           this.set('filterProperty',this.get('filter'));
           console.log(this.get('filterProperty'));
        }
    },


});
