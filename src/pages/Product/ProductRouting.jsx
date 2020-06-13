import React from 'react';
import {
    Route, Switch, useRouteMatch
} from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import {useDispatch} from "react-redux";
import {resourceName} from "./Config";
import {searchProduct} from "../../redux/ProductSlice";

const ProductRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <ProductDetail action="CREATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id/update`}
                render={() => {
                    return <ProductDetail action="UPDATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <ProductDetail action="VIEW"/>;
                }}
            />
            <Route path="/" render={(props) => {
                dispatch(searchProduct());
                return <ProductList/>
            }}/>
        </Switch>
    );
};

export default ProductRouting;