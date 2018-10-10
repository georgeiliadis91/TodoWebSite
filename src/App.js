import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import { Provider, Consumer } from './context';

import Login from './Logins/Login';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/TodoList', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Consumer>
            {value => {
              const { authed } = value;

              return (
                <div className="App">
                  <nav class="navbar navbar-dark bg-primary mb-5">
                    <span class="navbar-brand mx-auto h1 mb-1 ">Todo List</span>
                  </nav>

                  <Switch>
                    <PublicRoute
                      authed={authed}
                      exact
                      path="/"
                      component={Login}
                    />

                    <PrivateRoute
                      authed={authed}
                      path="/TodoList"
                      component={TodoList}
                    />

                    <Route render={() => <h3>This path does not exist.</h3>} />
                  </Switch>
                </div>
              );
            }}
          </Consumer>
        </Router>
      </Provider>
    );
  }
}

export default App;
