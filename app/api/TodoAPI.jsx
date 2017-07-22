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
  },
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
    
      return searchText.length === 0 || todo.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
          
    });

    // sort todos with non completed first
    filteredTodos.sort((a, b) => {
      // return 1 if  b should come before a
      // return -1 if a should come before b
      // return 0 if no need to be sorted.
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};