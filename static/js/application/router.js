App.Router.map(function() {
  // put your routes here
  this.resource('app', { path: '/' });  
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});