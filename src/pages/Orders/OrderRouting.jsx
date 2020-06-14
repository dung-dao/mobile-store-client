import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import {searchCustomer} from "../../redux";
import {useDispatch} from "react-redux";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route path="/" render={(props) => {
                dispatch(searchCustomer())
                return <OrderDetail/>
            }}/>
        </Switch>
    );
};

export default OrderRouting;