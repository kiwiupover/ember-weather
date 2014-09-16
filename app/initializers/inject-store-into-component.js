export default {
  name: "injectStoreIntoComponent",
  after: "store",

  initialize: function(container) {
    container.typeInjection('component', 'store', 'store:main');
  }
};
