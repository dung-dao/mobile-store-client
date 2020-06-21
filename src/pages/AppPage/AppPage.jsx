import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppLayout from "../../layouts/AppLayout";
import CustomerRouting from "../Customers/CustomerRouting";
import Dashboard from "../DashBoard/Dashboard";
import ImportsRouting from "../Orders/imports/ImportsRouting";
import UserRouting from "../Users/UserRouting";
import OrderRouting from "../Orders/orders/OrderRouting";
import ProductRouting from "../Product/ProductRouting";
import ProviderRouting from "../Providers/ProviderRouting";

const AppPage = (props) => {
    return (
        <AppLayout>
            <Switch>
                <Route
                    path={"/providers"} render={(props) => {
                    return <ProviderRouting {...props}/>
                }}
                />
                <Route
                    path={"/customers"}
                    render={(props) => {
                        return <CustomerRouting {...props}/>
                    }}/>
                <Route
                    path={"/orders"}
                    render={(props) => {
                        return <OrderRouting {...props}/>
                    }}/>


                <Route
                    path={"/imports"}
                    render={(props) => {
                        return <ImportsRouting{...props}/>
                    }}
                />

                <Route
                    path={"/users"}
                    render={(props) => {
                        return <UserRouting {...props}/>
                    }}/>
                <Route
                    path={"/products"}
                    render={(props) => {
                        return <ProductRouting {...props}/>
                    }}/>
                <Route path="/" component={Dashboard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;
