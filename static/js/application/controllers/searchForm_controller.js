SearchForm.SearchFormController = Ember.ArrayController.extend({
    
  actions: {
    submitUrl: function() {
      // Get the URL set by the "New Url" text field
      var url = this.get('newUrl');
      if (!url.trim()) { return; }

      var prefix = 'http://';

      if (url.slice(0, prefix.length) !== prefix) {
        url = prefix + url;
      }
      
      var timeframe = this.timeframe.filterBy('selected', true);
      newTimeframe = timeframe[0].get('title');

      // Create the new recentSearch model
      var recentSearch = this.store.createRecord('recentSearch', {
        title: url,
        timeframe: newTimeframe,
        timestamp: new Date(),
        found: false
      });

      // Clear the "New Url" text field
      this.set('newUrl', '');

      // Save the new model
      recentSearch.save();
    }
  },

  remaining: function() {
    return this.timeframe.filterBy('selected', false).get('length');
  }.property('timeframe.@each.selected'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'choice' : 'choices';
  }.property('remaining')

});