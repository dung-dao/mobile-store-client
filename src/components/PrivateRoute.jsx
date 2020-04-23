import React from "react";
import { Route, Redirect } from "react-router-dom";

//Mock login state
const isLogin = false;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
