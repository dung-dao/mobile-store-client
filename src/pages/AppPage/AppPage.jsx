import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {searchCustomer, searchProvider} from "../../redux";
import ProviderRouting from "../Providers/ProviderRouting";
import Dashboard from "../../Dashboard";
import PrivateRoute from "../../components/PrivateRoute";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";
import CustomerRouting from "../Customers/CustomerRouting";

const AppPage = (props) => {
    const dispatch = useDispatch();
    return (
        <AppLayout>
            <Switch>
                <Route
                    path={"/providers"} render={(props) => {
                    dispatch(searchProvider());
                    return <ProviderRouting {...props}/>
                }}
                />
                <Route
                    path={"/customers"}
                    render={(props) => {
                        dispatch(searchCustomer());
                        return <CustomerRouting {...props}/>
                    }}/>
                <PrivateRoute path="/" component={Dashboard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;