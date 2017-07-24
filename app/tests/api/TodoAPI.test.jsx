var expect = require('expect');

var TodoAPI = require('TodoAPI');
var localStorageKeyTodos = 'todos';

describe('TodoAPI', () => {

  beforeEach(() => {
    localStorage.removeItem(localStorageKeyTodos);
  });
  
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {

    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      try {
        var actualTodos = JSON.parse(localStorage.getItem(localStorageKeyTodos));

        expect(actualTodos).toEqual(todos);
      } catch (error) {
        expect().fail(error);
      }
    });

    it('should not set invalid todos array', () => {
      var badTodos = {a: 'b'};

      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem(localStorageKeyTodos)).toBe(null);
    });

  });

  describe('getTodos', () => {
    
    it('should return empty array for bad localstorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    })

    it('should return todo if valid array is localstorage', () => {
      var todos = [{
        id: 23,
        text: 'text all files',
        completed: false
      }];
      localStorage.setItem(localStorageKeyTodos, JSON.stringify(todos));
      
      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);
    });

  });

  describe('filterTodos', () => {

    var todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Some text here',
      completed: false
    },{
      id: 3,
      text: 'Some text here',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');

      expect(filteredTodos.length).toBe(3);
    });

    it('should return non-completed todos when showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');

      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');

      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter todos by searchText', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');

      expect(filteredTodos.length).toBe(3);
    });

    it('should return all todos if searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');

      expect(filteredTodos.length).toBe(3);
    });

  });

});
