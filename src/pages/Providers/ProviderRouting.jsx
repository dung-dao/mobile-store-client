import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import Provider from "./Provider";
import ProviderDetail from "./ProviderDetail";
import {useDispatch} from "react-redux";
import {searchProvider} from "../../redux";

const ProviderRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <ProviderDetail/>
            </Route>
            <Route path={`${match.path}/create`}>
                <ProviderDetail/>
            </Route>
            <Route path="/" render={(props) => {
                dispatch(searchProvider)
                return <Provider/>
            }}/>
        </Switch>
    );
};

export default ProviderRouting;