import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import OrderList from "./OrderList";
import {searchOrder} from "../../redux/OrderSlice";
import {searchCustomer} from "../../redux";
import {searchProduct} from "../../redux/ProductSlice";
import OrderDetail from "./OrderDetail";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${match.path}/create`}
                render={(props) => {
                    dispatch(searchCustomer());
                    dispatch(searchProduct());
                    return <OrderDetail/>
                }}
            />

            <Route
                path={`${match.path}/:id`}
                render={(props) => {
                    return <OrderDetail/>
                }}
            />

            <Route
                path={`${match.path}/`}
                exact
                render={(props) => {
                    dispatch(searchOrder({orderTypeId: 2}));
                    return <OrderList/>;
                }}/>

        </Switch>
    );
};

export default OrderRouting;
