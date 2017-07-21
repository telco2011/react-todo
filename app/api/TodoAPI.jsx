var $ = require('jquery');

module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var strTodos = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(strTodos);
    } catch (err) {
      console.log('WARNING: JSON.parse doesn\'t work');
    }

    return $.isArray(todos) ? todos : [];
  }
};