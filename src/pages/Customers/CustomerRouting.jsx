import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import {useDispatch} from "react-redux";
import {searchCustomer} from "../../redux";

const resourceName = 'customers';

const CustomerRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <CustomerDetail action="CREATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id/update`}
                render={() => {
                    return <CustomerDetail action="UPDATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <CustomerDetail action="VIEW"/>;
                }}
            />
            <Route path="/" render={(props) => {
                dispatch(searchCustomer());
                return <CustomerList/>
            }}/>
        </Switch>
    );
};

export default CustomerRouting;
