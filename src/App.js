import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/SignIn/SignIn";
//import logo from "./logo.svg";
//import { Counter } from "./features/counter/Counter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute
            restricted={true}
            component={LoginPage}
            path="/signin"
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
