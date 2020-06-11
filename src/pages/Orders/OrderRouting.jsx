import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const match = useRouteMatch();
    // const dispatch = useDispatch();
    return (
        <Switch>
            <Route path="/" render={(props) => {
                // dispatch(searchProvider)
                return <OrderDetail/>
            }}/>
        </Switch>
    );
};

export default OrderRouting;