export default Ember.Component.extend({

  tagName: 'li',
  classNames: 'panel',

  isEditing: false,

  classNameBindings: 'isVeryHot:callout',

  isVeryHot: function(){
    if (this.get('high') > 99){
      return true;
    }
  }.property('high'),

  didInsertElement: function(){
    this.$().hide().fadeIn(2000);
  },

  actions: {
    save: function(playground){
      this.sendAction('saveAction', playground);
    },
    editing: function(){
      this.toggleProperty('isEditing');
    }
  }

});
