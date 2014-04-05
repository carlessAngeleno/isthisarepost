SearchForm.Router.map(function() {
  // put your routes here
  this.resource('searchForm', { path: '/' });  
});

SearchForm.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});