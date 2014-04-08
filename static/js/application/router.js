SearchForm.Router.map(function() {
  // put your routes here
  this.resource('searchForm', { path: '/' });  
});

SearchForm.SearchFormRoute = Ember.Route.extend({
  
  model: function() {
    // Why Em.RSVP.hash() ?
    // http://stackoverflow.com/a/19466975
    // http://stackoverflow.com/a/19466975    
    return Em.RSVP.hash({
    	timeframe: this.store.find('timeframe'),
    	recentSearch: this.store.find('recentSearch')
    });
  },

  setupController: function(controller, model) {
    // You can use model.post to get post, etc
    // Since the model is a plain object you can just use setProperties
    controller.setProperties(model);
  }
});