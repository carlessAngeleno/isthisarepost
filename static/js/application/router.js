SearchForm.Router.map(function() {
  // put your routes here
  this.resource('searchForm', { path: '/' });  
});

SearchForm.SearchFormRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('timeframe');
  }
});