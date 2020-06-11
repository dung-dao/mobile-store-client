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
    return (
        <Switch>
            <Route
                exact
                path={`${match.path}/create`}
                render={(props => {
                    return <ProviderDetail action="CREATE"/>;
                })}
            />

            <Route
                exact
                path={`${match.path}/:id/update`}
                render={(props => {
                    return <ProviderDetail action="UPDATE"/>;
                })}
            />

            <Route
                exact
                path={`${match.path}/:id`}
                render={(props => {
                    return <ProviderDetail action="VIEW"/>;
                })}
            />

            <Route
                path={`${match.path}/`}
                render={(props) => {
                    return <Provider/>
                }}/>
        </Switch>
    );
};

export default ProviderRouting;