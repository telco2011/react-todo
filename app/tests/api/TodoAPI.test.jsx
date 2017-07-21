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
        text: 'text all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      try {
        var actualTodos = JSON.parse(localStorage.getItem(localStorageKeyTodos));

        expect(actualTodos).toEqual(todos);
      } catch (error) {
        expect().fail();
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

});