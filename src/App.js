import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/SignIn/SignIn";
//import logo from "./logo.svg";
//import { Counter } from "./features/counter/Counter";
import "./App.css";
import AppLayout from "./layouts/AppLayout";

class App extends Component {
  render() {
    return (
      <Switch>
        <PublicRoute
          restricted={true}
          component={LoginPage}
          path="/signin"
          exact
        />
        <Route component={AppLayout}></Route>
      </Switch>
    );
  }
}

export default App;
