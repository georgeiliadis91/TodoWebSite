import React, { Component } from 'react';
import { firebaseAuth } from '../Firebase.js';

export default class EmailSignIn extends Component {
  state = {
    email: '',
    password: '',
    error: {
      message: ''
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signIn() {
    const { email, password } = this.state;
    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.signIn();
    this.setState({
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <div>
        {this.state.error.message !== '' && (
          <p class="text-danger">{this.state.error.message}</p>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            class="form-control mb-3 mx-auto col-6"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            class="form-control mb-3 mx-auto col-6"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button
            class="btn btn-primary btn-block mb-3 mx-auto col-6"
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}
