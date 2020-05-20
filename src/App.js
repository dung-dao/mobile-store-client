import React, {useEffect} from "react";
import {Switch} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

import Dashboard from "./Dashboard";
import LoginPage from "./pages/SignIn/SignIn";

import {useDispatch} from "react-redux";
import ProviderRouting from "./pages/Providers/ProviderRouting";

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
                <PrivateRoute path="/providers">
                    <ProviderRouting/>
                </PrivateRoute>
                <PrivateRoute path="/" component={Dashboard}/>
            </Switch>
        </div>
    );
};

export default App;
