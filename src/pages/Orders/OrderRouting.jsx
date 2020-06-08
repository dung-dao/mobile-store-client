import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import OrderList from "./OrderList";

const resourceName = 'customers';

const OrderRouting = (props) => {
    const match = useRouteMatch();
    // const dispatch = useDispatch();
    return (
        <Switch>
            <Route path="/" render={(props) => {
                // dispatch(searchProvider)
                return <OrderList/>
            }}/>
        </Switch>
    );
};

export default OrderRouting;