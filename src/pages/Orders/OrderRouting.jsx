import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import Order from "./Order";
import {useDispatch} from "react-redux";
import {searchProvider} from "../../redux";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const match = useRouteMatch();
    // const dispatch = useDispatch();
    return (
        <Switch>
            <Route path="/" render={(props) => {
                // dispatch(searchProvider)
                return <Order/>
            }}/>
        </Switch>
    );
};

export default OrderRouting;