// var Todo = Backbone.Model.extend({});

// // We can then create our own concrete instance of a (Todo) model
// // with no values at all:
// var todo1 = new Todo();
// // Following logs: {}
// console.log(JSON.stringify(todo1));

// // or with some arbitrary data:
// var todo2 = new Todo({
//   title: 'Check the attributes of both model instances in the console.',
//   completed: true
// });

// // Following logs: {"title":"Check the attributes of both model instances in the console.","completed":true}
// console.log(JSON.stringify(todo2));

var Todo = Backbone.Model.extend({
  initialize: function(){
      console.log('This model has been initialized.');
  }
});

var myTodo = new Todo();
// Logs: This model has been initialized.