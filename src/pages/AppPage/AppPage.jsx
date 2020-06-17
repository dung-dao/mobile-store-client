import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProviderRouting from "../Providers/ProviderRouting";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";
import CustomerRouting from "../Customers/CustomerRouting";
import ProductRouting from "../Products/ProductRouting";
import OrderRouting from "../Orders/OrderRouting";
import Dashboard from "../DashBoard/Dashboard";

const AppPage = (props) => {
    const dispatch = useDispatch();
    return (
        <AppLayout>
            <Switch>
                <Route
                    path={"/providers"} render={(props) => {
                    // dispatch(searchProvider());
                    return <ProviderRouting {...props}/>
                }}
                />
                <Route
                    path={"/customers"}
                    render={(props) => {
                        // dispatch(searchCustomer());
                        return <CustomerRouting {...props}/>
                    }}/>
                <Route
                    path={"/products"}
                    render={(props) => {
                        // dispatch(searchCustomer());
                        return <ProductRouting {...props}/>
                    }}/>
                <Route
                    path={"/orders"}
                    render={(props) => {
                        // dispatch(searchCustomer());
                        return <OrderRouting {...props}/>
                    }}/>
                <Route path="/" component={Dashboard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;
