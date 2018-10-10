import React, { Component } from 'react';
import { firebaseAuth } from '../Firebase.js';

export default class EmailSignUp extends Component {
  state = {
    email: '',
    pass1: '',
    pass2: '',
    error: {
      message: ''
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signUp = () => {
    let email = this.state.email;
    let pass1 = this.state.pass1;

    firebaseAuth()
      .createUserWithEmailAndPassword(email, pass1)
      .then(() => {
        this.setState({
          email: '',
          password: ''
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    // this.ErrorCheck();

    this.signUp();
  };

  render() {
    let isNotMatching = this.state.pass1 !== this.state.pass2;
    let isEmpty =
      this.state.pass1 === '' ||
      this.state.email === '' ||
      this.state.pass1 === '';

    return (
      <div>
        {isNotMatching && (
          <p class="text-danger">Please enter matching passwords.</p>
        )}
        {isEmpty && <p class="text-danger">Please fill in all the fields.</p>}
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
            name="pass1"
            type="password"
            value={this.state.pass1}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <input
            class="form-control mb-3 mx-auto col-6"
            name="pass2"
            type="password"
            value={this.state.pass2}
            onChange={this.handleChange}
            placeholder="Confirm Password"
          />
          <button
            class="btn btn-primary btn-block mb-3 mx-auto col-6"
            onClick={this.handleSubmit}
            disabled={isNotMatching || isEmpty}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
