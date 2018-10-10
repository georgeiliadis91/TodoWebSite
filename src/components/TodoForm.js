import React, { Component } from 'react';
import shortid from 'shortid';

export default class TodoForm extends Component {
  state = {
    text: ''
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      complete: false
    });
    this.setState({
      text: ''
    });
  };

  render() {
    let isEmpty = this.state.text === '';
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            class="form-control mb-3"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Enter Todo"
          />
          <button
            disabled={isEmpty}
            class="btn btn-primary btn-block mb-3"
            onClick={this.handleSubmit}
          >
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}
