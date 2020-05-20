import React, {useEffect} from "react";
import {Switch} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

import Dashboard from "./Dashboard";
import LoginPage from "./pages/SignIn/SignIn";
import Provider from "./pages/Providers/Provider";

import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Switch>
                <PublicRoute
                    restricted={true}
                    component={LoginPage}
                    path="/signin"
                />
                <PrivateRoute exact path="/providers" component={Provider}/>
                <PrivateRoute path="/" component={Dashboard}/>

            </Switch>
        </div>
    );
};

export default App;
