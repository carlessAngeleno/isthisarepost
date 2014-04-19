SearchForm.TimeframeController = Ember.ObjectController.extend({
  
  needs: ['searchForm'],

  selected: function(key, value) {
    
    var model = this.get('model');
    
    if (value === undefined) {
      // getter
      return model.get('selected');
    } else {
      // setter
      model.set('selected', value);
      model.save();
      
      // de-select rest (only 1 active allowed)
      var timeframes = this.get('controllers.searchForm.timeframe');
      timeframes.forEach(
        function(timeframe) {
          if (timeframe.id !== this.id) {
            timeframe.set('selected', false);
            timeframe.save();
          }
        }, 
        model
      );

      return value;
    }
  }.property('model.selected')

});

