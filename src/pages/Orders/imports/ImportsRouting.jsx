import React, {useRef} from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {searchOrder} from "../../../redux/OrderSlice";
import {searchProvider} from "../../../redux";
import {searchProduct} from "../../../redux/ProductSlice";
import ImportsList from "./ImportList";
import ImportDetail from "./ImportDetail";
import {useReactToPrint} from "react-to-print";
// import ImportDetail from "./ImportDetail";

const resourceName = 'orders';

const ImportsRouting = (props) => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Switch>
            <Route
                path={`${match.path}/create`}
                render={(props) => {
                    dispatch(searchProvider());
                    dispatch(searchProduct());
                    return <ImportDetail/>
                }}
            />

            <Route
                path={`${match.path}/:id`}
                render={(props) => {
                    return <ImportDetail/>
                }}
            />

            <Route
                path={`${match.path}/`}
                exact
                render={(props) => {
                    dispatch(searchOrder({orderTypeId: 1}));
                    return <ImportsList/>;
                }}/>

        </Switch>
    );
};

export default ImportsRouting;
