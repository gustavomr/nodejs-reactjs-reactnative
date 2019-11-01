import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Spot from "./pages/Spot";
import Register from "./pages/Register";

export const isAuthenticated = () =>
  localStorage.getItem(process.env.REACT_APP_TOKEN_KEY) !== null;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect
          to={{ pathname: "/dashboard", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default function Routes(props) {
  return (
    <Switch>
      <PublicRoute path="/register" exact component={Register} />
      <Route
        path="/"
        exact
        render={propss => <Login changeFn={props.changeStatus} />}
      />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/spot" component={Spot} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}
