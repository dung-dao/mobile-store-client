import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryDetail from "./CategoryDetail";
import {useDispatch} from "react-redux";
import {resourceName} from "./Config";
import {searchProduct} from "../../redux/ProductSlice";
import {searchCategory} from "../../redux/CategorySlice";

const CategoryRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <CategoryDetail action="CREATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id/update`}
                render={() => {
                    return <CategoryDetail action="UPDATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <CategoryDetail action="VIEW"/>;
                }}
                exact
            />
            <Route path="/" render={(props) => {
                dispatch(searchProduct());
                dispatch(searchCategory());
                return <CategoryList/>
            }}/>
        </Switch>
    );
};

export default CategoryRouting;
