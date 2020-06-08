import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {searchCustomer, searchProvider} from "../../redux";
import ProviderRouting from "../Providers/ProviderRouting";
import PrivateRoute from "../../components/PrivateRoute";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";
import CustomerRouting from "../Customers/CustomerRouting";
import ProductRouting from "../Products/ProductRouting";

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
                <Route
                    path={"/products"}
                    render={(props) => {
                        // dispatch(searchCustomer());
                        return <ProductRouting {...props}/>
                    }}/>
                <PrivateRoute path="/" component={ProviderRouting}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;