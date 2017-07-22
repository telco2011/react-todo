var React = require('react');
var TodoList = require('TodoList');

var AddTodo = React.createClass({
  onSubmit: function (event) {
    event.preventDefault();
    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function () {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button className="button expanded">Add TODO</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;