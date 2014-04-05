SearchForm.SearchFormController = Ember.ArrayController.extend({
  actions: {
    submitUrl: function() {
      // Get the todo title set by the "New Todo" text field
      var url = this.get('newUrl');
      if (!url.trim()) { return; }
      console.log(url);
      // // Create the new Todo model
      // var todo = this.store.createRecord('todo', {
      //   title: title,
      //   isCompleted: false
      // });

      // // Clear the "New Todo" text field
      // this.set('newTitle', '');

      // // Save the new model
      // todo.save();
    }
  }
});