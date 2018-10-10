import React, { Component } from 'react';
import { firebaseAuth } from '../Firebase.js';
import { googleProvider } from '../Firebase.js';

export default class GoogleLogin extends Component {
  authWithGoogle = () => {
    firebaseAuth()
      .signInWithPopup(googleProvider)
      .then(result => {
        //we could do something right after the login.
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.authWithGoogle} class="btn btn-primary mb-2">
          Google Login
        </button>
      </div>
    );
  }
}
