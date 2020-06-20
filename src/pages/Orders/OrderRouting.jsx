import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import OrderDetail from "./OrderDetail";
import {searchCustomer} from "../../redux";
import {useDispatch} from "react-redux";
import {searchProduct} from "../../redux/ProductSlice";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route path="/" render={(props) => {
                dispatch(searchCustomer());
                dispatch(searchProduct());
                return <OrderDetail/>
            }}/>
        </Switch>
    );
};

export default OrderRouting;
