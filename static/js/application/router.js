App.Router.map(function() {
  // put your routes here
  this.resource('app', { path: '/' });  
});


// ... additional lines truncated for brevity ...
App.AppRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('form');
  }
});


// App.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });