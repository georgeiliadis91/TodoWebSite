import React, { Component } from 'react';
import { firebaseAuth } from '../Firebase.js';
import { facebookProvider } from '../Firebase.js';

export default class FacebookLogin extends Component {
  authWithFacebook = () => {
    firebaseAuth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.setState({ error });
        } else {
          this.setState({ redirect: true });
        }
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.authWithFacebook} class="btn btn-primary mb-5">
          Facebook Login
        </button>
      </div>
    );
  }
}
