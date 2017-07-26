var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('Reducers', () => {

  describe('searchTextReducer', () => {

    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });

  });

  describe('showCompletedReducer', () => {

    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(true), df(action));

      expect(res).toEqual(false);
    });

  });

  describe('todosReducer', () => {

    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc123',
          text: 'Something to do',
          completed: false,
          createdAt: 92384275
        }
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    // defined todos array with realistic todo item
    // generate action
    // call reducer and assert completed flipped
    it('should toggle todo', () => {
      var todos = [{
        id: 1,
        text: 'First TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      },{
        id: 2,
        text: 'Second TODO',
        completed: true,
        createdAt: 123,
        completedAt: 123
      },{
        id: 3,
        text: 'Third TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      }];
      var action = {
        type: 'UPDATE_TODO',
        id: todos[1].id,
        updates: {
          completed: false,
          completedAt: null
        }
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(3);
      expect(res[1].completed).toEqual(action.updates.completed);
      expect(res[1].completedAt).toEqual(action.updates.completedAt);
      expect(res[1].text).toEqual(todos[1].text);
    });

    it('should add existing todos', () => {
      var todos = [{
        id: 1,
        text: 'First TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      },{
        id: 2,
        text: 'Second TODO',
        completed: true,
        createdAt: 123,
        completedAt: 123
      },{
        id: 3,
        text: 'Third TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      }];
      var action = {
        type: 'ADD_TODOS',
        todos: todos
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(3);
      expect(res[0]).toEqual(todos[0]);
    });

    it('should wipe todos on logout', () => {
      var todos = [{
        id: 1,
        text: 'First TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      },{
        id: 2,
        text: 'Second TODO',
        completed: true,
        createdAt: 123,
        completedAt: 123
      },{
        id: 3,
        text: 'Third TODO',
        completed: false,
        createdAt: 12,
        completedAt: undefined
      }];
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(0);
    });

  });

  describe('authReducer', () => {

    it('should store uid on LOGIN', () => {
      const action = {
        type: 'LOGIN',
        uid: 'abc123'
      };
      const res = reducers.authReducer(undefined, df(action));

      expect(res).toEqual({
        uid:action.uid
      });
    });

    it('should wipe auth on LOGOUT', () => {
      const authData = {
        uid: '123abc'
      };
      const action = {
        type: 'LOGOUT'
      };
      const res = reducers.authReducer(df(authData), df(action));

      expect(res).toEqual({});
    });

  });

});