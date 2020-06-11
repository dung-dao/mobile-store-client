import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {searchCustomer, searchProvider} from "../../redux";
import ProviderRouting from "../Providers/ProviderRouting";
import PrivateRoute from "../../components/common/PrivateRoute";
import AppLayout from "../../layouts/AppLayout";
import {useDispatch} from "react-redux";
import CustomerRouting from "../Customers/CustomerRouting";
import ProductRouting from "../Products/ProductRouting";
import OrderRouting from "../Orders/OrderRouting";
import LoadingPage from "../../components/common/LoadingPage";
import UserRouting from "../Users/UserRouting";

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
                    path={"/products"}
                    render={(props) => {
                        return <ProductRouting {...props}/>
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
                <PrivateRoute path="/" component={LoadingPage}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;