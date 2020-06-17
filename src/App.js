import React from "react";
import {Switch, Route} from "react-router-dom";
import "./App.less";
import {useDispatch} from "react-redux";

import PublicRoute from "./components/common/PublicRoute";
import PrivateRoute from "./components/common/PrivateRoute";
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
