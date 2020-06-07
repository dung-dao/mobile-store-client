import React from "react";
import {Switch, Route} from "react-router-dom";
import "./App.css";
import {useDispatch} from "react-redux";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AppPage from "./pages/AppPage/AppPage";
import LoginPage from "./pages/SignIn/SignIn";

const App = (props) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Switch>
                <PublicRoute
                    component={LoginPage}
                    path="/signin"
                />
                <PrivateRoute path="/" component={AppPage}/>
            </Switch>
        </div>
    );
};

export default App;
