import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProviderRouting from "../Providers/ProviderRouting";
import PrivateRoute from "../../components/common/PrivateRoute";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";
import CustomerRouting from "../Customers/CustomerRouting";
import OrderRouting from "../Orders/OrderRouting";
import LoadingPage from "../../components/common/LoadingPage";
import UserRouting from "../Users/UserRouting";
import ProductRouting from "../Product/ProductRouting";
import TestPage from "../TestPage/TestPage";

const AppPage = (props) => {
    const dispatch = useDispatch();
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
                    path={"/users"}
                    render={(props) => {
                        return <UserRouting {...props}/>
                    }}/>
                <Route
                    path={"/products"}
                    render={(props) => {
                        return <ProductRouting {...props}/>
                    }}/>
                <PrivateRoute path="/" component={TestPage}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;