import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userSelector } from "../redux";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userSlice = useSelector(userSelector);
  return (
    <Route
      {...rest}
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      render={(props) =>
        userSlice.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
