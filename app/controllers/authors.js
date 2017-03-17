import Ember from 'ember';

export default Ember.Controller.extend({
    sortProperty: 'age',
    filterProperty: '',
    reverseSort: false,

    sortedArray: Ember.computed.sort('filteredArray', 'sortDefinition'),

    sortDefinition: Ember.computed('sortProperty', 'reverseSort', function () {
        let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
        return [`${this.get('sortProperty')}:${sortOrder}`];
    }),
    filteredArray: function () {
        var filter = this.get('filter');
        var regExPattern = '\\b' + filter + '\\b';
        var regexp = new RegExp(regExPattern, 'gi');
        if(filter == '' || filter== null){
            return this.get('model');
        }else{
        return this.get('model').filter(function (place) {
            return place.get('name').match(regexp);
        });
        }
    }.property('filterProperty'),
    actions: {
        sortBy: function (property) {
            this.set('sortProperty', property);
            this.toggleProperty('reverseSort');
        },   
        autocomplete: function () {
           this.set('filterProperty',this.get('filter'));
           console.log(this.get('filterProperty'));
        }
    },


});
