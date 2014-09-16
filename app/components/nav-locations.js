export default Ember.Component.extend({

  showMenu: false,
  animateMenu: false,
  classNames: "perspective effect-airbnb",
  classNameBindings: ['showMenu:animate', 'animateMenu:modalview' ],

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
    }
  },

  _doPageAnimation: function(){
    var self = this,
        animateMenu = this.get('animateMenu');

    this.toggleProperty('showMenu');
    if (animateMenu) {
      Ember.run.later( function(){
        self.toggleProperty('animateMenu');
      }, 350);
    } else {
      self.toggleProperty('animateMenu');
    }

  }
});
