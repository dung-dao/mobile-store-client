import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import {useDispatch} from "react-redux";
import {searchProvider} from "../../redux";

const resourceName = 'customers';

const CustomerRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <CustomerDetail/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <CustomerDetail/>;
                }}
            />
            <Route path="/" render={(props) => {
                dispatch(searchProvider)
                return <CustomerList/>
            }}/>
        </Switch>
    );
};

export default CustomerRouting;