import Ember from 'ember';

export default Ember.Component.extend({

  displayDate: Ember.computed('weather.time', function () {
    return moment.unix(this.get('weather.time')).format('MMM DD');
  })


});
