import Ember from 'ember';

export default Ember.Component.extend({

  showMenu: false,
  animateMenu: false,
  classNames: "perspective effect-airbnb",
  classNameBindings: ['showMenu:animate', 'animateMenu:modalview' ],

  locations: [],

  actions: {
    menu: function(){
      this._doPageAnimation();
    },

    link: function(link) {
      this._doPageAnimation();
      this.sendAction("transitionToLocation", link);
    },

    transitionToLocationHandler: function(location){
      this._doPageAnimation();
      this.sendAction("transitionToSeachLocation", location);
    },

    transitionToSearchedLocationHandler: function(location){
      this.sendAction("transitionToSeachLocation", location);
    },

    menuClose: function(){
      if ( this.get('showMenu') ) {
        this._doPageAnimation();
      }
    }
  },

  _doPageAnimation: function(){
    var self = this,
        animateMenu = this.get('animateMenu');

    this.toggleProperty('showMenu');
    if (animateMenu) {
      Ember.run.later( function(){
        self.toggleProperty('animateMenu');
      }, 450);
    } else {
      self.toggleProperty('animateMenu');
    }

  }
});
