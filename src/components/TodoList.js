import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { firebaseAuth, Fdatabase } from '../Firebase.js';
import { Consumer } from '../context';

class TodoList extends Component {
  state = {
    todos: [],
    todoToShow: 'all',
    toggleAllComplete: true
  };

  addTodo = todo => {
    this.setState({
      todos: [todo, ...this.state.todos]
    });
  };

  toggleComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        //Update
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  };

  updateTodoToShow = s => {
    this.setState({
      todoToShow: s
    });
  };

  handleonDeleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  removeAllTodosThatAreComplete = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.complete)
    });
  };

  componentWillMount() {
    //Call to database to check if there any todos already there.
    var userId = firebaseAuth().currentUser.uid;

    Fdatabase.ref('/todo/' + userId)
      .once('value')
      .then(snapshot => {
        let array = [];
        snapshot.forEach(data => {
          var todo = {
            complete: data.val().complete,
            id: data.val().id,
            text: data.val().text
          };
          array.push(todo);
        });
        this.setState({
          todos: array
        });
      });
  }

  render() {
    let todos = [];

    if (this.state.todoToShow === 'all') {
      todos = this.state.todos;
    } else if (this.state.todoToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === 'complete') {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <Consumer>
        {value => {
          const { userID } = value;

          return (
            <div class="container text-center font-weight-normal mb-1">
              <TodoForm onSubmit={this.addTodo} class="mb-2" />

              {todos.map(todo => (
                <Todo
                  key={todo.id}
                  toggleComplete={() => this.toggleComplete(todo.id)}
                  todo={todo}
                  onDelete={() => this.handleonDeleteTodo(todo.id)}
                />
              ))}
              <div class="font-weight-normal mb-1">
                Todos left:{' '}
                {this.state.todos.filter(todo => !todo.complete).length}
              </div>
              <div class="mb-3">
                <button
                  class="btn btn-success mr-2"
                  onClick={() => this.updateTodoToShow('all')}
                >
                  Select All{' '}
                </button>
                <button
                  class="btn btn-success  mx-auto"
                  onClick={() => this.updateTodoToShow('active')}
                >
                  Select Active
                </button>
                <button
                  class="btn btn-success ml-2"
                  onClick={() => this.updateTodoToShow('complete')}
                >
                  Select Complete
                </button>
              </div>
              {this.state.todos.some(todo => todo.complete) ? (
                <div>
                  <button
                    class="btn btn-secondary btn-lg mb-2"
                    onClick={this.removeAllTodosThatAreComplete}
                  >
                    Remove Completed Items
                  </button>
                </div>
              ) : null}
              <div>
                <button
                  type="button"
                  class="btn btn-info btn-block mb-2"
                  onClick={() =>
                    this.setState({
                      todos: this.state.todos.map(todo => ({
                        ...todo,
                        complete: this.state.toggleAllComplete
                      })),
                      toggleAllComplete: !this.state.toggleAllComplete
                    })
                  }
                >
                  Toggle All: {`${this.state.toggleAllComplete}`}
                </button>
                <button
                  class="btn btn-warning mb-2"
                  onClick={() =>
                    Fdatabase.ref('todo/' + userID).set(this.state.todos)
                  }
                >
                  Save Changes to Database
                </button>
                <br />

                <button
                  class="btn btn-danger "
                  onClick={() => {
                    firebaseAuth().signOut();
                  }}
                >
                  Exit Application
                </button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default TodoList;
