import getJSON from "appkit/utils/get-json";

export default Ember.Component.extend({
  classNames: 'search',
  searchTerm: null,
  results: [],

  triggerSearch: function () {
    this.sendAction("searchMessage", this.get('searchTerm'));
  }.on('didInsertElement'),

  triggerAutoComplete: function () {
    var self = this;
    Ember.run.debounce(null, function () {
      getJSON('/api/search/' + self.get('searchTerm')).then(function (data) {
        self.set('results', self._parseResults(data));
      });
    }, 400);
  }.observes('searchTerm'),

  openResults: function() {
    if (this.get('results').length > 1) {

      var input = this.$().find('input'),
          inputOffsetTop = input.offset().top,
          inputOffsetLeft = input.offset().left,
          inputHeight = input.outerHeight(),
          topOffset = inputOffsetTop + inputHeight,

          resultDropdown = this.$().find('#result-dropdown');

      return resultDropdown.css({'top': topOffset, 'left': inputOffsetLeft});
    }
  }.observes('results'),

  closeResultDropdown: function(){
    this.$('#result-dropdown').css({'left': '-999999px'});
  },

  actions: {
    search: function (val) {
      this.closeResultDropdown();
      this.set('searchTerm', val);
      this.sendAction("searchMessage", val);
    }
  },

  _parseResults: function(data){
    var parsedData = JSON.parse(data[1]);
    return parsedData.RESULTS;
  }
});
