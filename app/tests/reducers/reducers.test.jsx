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
        text: 'Wald de dog'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
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
        type: 'TOGGLE_TODO',
        id: 2
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(3);
      expect(res[1].completed).toEqual(false);
      expect(res[1].completedAt).toEqual(undefined);
    });

  });

});