import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from "./serviceWorker";
import { history } from "./app/store";

import { Switch, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/SignIn/SignIn";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <PublicRoute
          restricted={true}
          component={LoginPage}
          path="/signin"
          exact
        />
        <Route component={App}></Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
