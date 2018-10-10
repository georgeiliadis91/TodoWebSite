import React, { Component } from 'react';
import { firebaseAuth } from './Firebase';

const Context = React.createContext();

//I am aware that there was no need to use the Context APi in this webapp, since i can access
//All the data i need with a call to Firebase which is a component it self. I just wanted to
//demostrate the use of it.

export class Provider extends Component {
  state = {
    authed: false,
    email: '',
    userID: ''
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          email: user.email,
          userID: user.uid
        });

        this.refs.logged.handleClose();
      } else {
        this.setState({
          authed: false,
          email: '',
          userID: ''
        });
      }
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
