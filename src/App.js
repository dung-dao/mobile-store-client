import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

import Dashboard from "./Dashboard";
import LoginPage from "./pages/SignIn/SignIn";

import {useDispatch} from "react-redux";
import ProviderRouting from "./pages/Providers/ProviderRouting";
import {searchProvider} from "./redux";

const App = (props) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Switch>
                <PublicRoute
                    component={LoginPage}
                    path="/signin"
                />
                <Route path={"/providers"} render={(props) => {
                    dispatch(searchProvider());
                    return <ProviderRouting {...props}/>
                }}/>
                <PrivateRoute path="/" component={Dashboard}/>
            </Switch>
        </div>
    );
};

export default App;
