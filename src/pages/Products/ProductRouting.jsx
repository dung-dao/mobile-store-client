import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
// import {useDispatch} from "react-redux";
import {searchProvider} from "../../redux";

const resourceName = 'customers';

const ProductRouting = (props) => {
    const match = useRouteMatch();
    // const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <ProductDetail/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <ProductDetail/>;
                }}
            />
            <Route path="/" render={(props) => {
                // dispatch(searchProvider)
                return <Product/>
            }}/>
        </Switch>
    );
};

export default ProductRouting;