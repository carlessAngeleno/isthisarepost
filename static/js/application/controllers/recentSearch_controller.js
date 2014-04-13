SearchForm.RecentSearchController = Ember.ObjectController.extend({
  found: function(key, value) {
    var model = this.get('model');

    if (value === undefined) {
      // getter
      return model.get('found');
    } else {
      // setter
      model.set('found', value);
      model.save();
      return value;
    }
  }.property('model.found')
});


