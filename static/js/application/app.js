App = Ember.Application.create({
	rootElement: "#main"
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();