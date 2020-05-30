import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {searchProvider} from "../../redux";
import ProviderRouting from "../Providers/ProviderRouting";
import Dashboard from "../../Dashboard";
import PrivateRoute from "../../components/PrivateRoute";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";

const AppPage = (props) => {
    const dispatch = useDispatch();
    return (
        <AppLayout>
            <Switch>
                <Route path={"/providers"} render={(props) => {
                    dispatch(searchProvider());
                    return <ProviderRouting {...props}/>
                }}/>
                <PrivateRoute path="/" component={Dashboard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;