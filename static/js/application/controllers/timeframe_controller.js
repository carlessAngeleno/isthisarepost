SearchForm.TimeframeController = Ember.ObjectController.extend({

  selected: function(key, value) {
    var model = this.get('model');

    if (value === undefined) {
      // getter
      return model.get('selected');
    } else {
      // setter
      model.set('selected', value);
      model.save();
      return value;
    }
  }.property('model.selected')

});


