import React from 'react';
import {
    Route, Switch, useRouteMatch, useParams
} from "react-router-dom";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import {useDispatch} from "react-redux";
import {searchCustomer, searchProvider} from "../../redux";
import {searchUser} from "../../redux/allUsersSlice";
import UserRegister from "./UserRegister";
import UserRegisterv2 from "./UserRegisterv2";

const resourceName = 'users';

const UserRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    return <UserDetail action="CREATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id/update`}
                render={() => {
                    return <UserDetail action="UPDATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    return <UserDetail action="VIEW"/>;
                }}
            />
            <Route path="/" render={(props) => {
                dispatch(searchUser());
                return <UserList/>
            }}/>
        </Switch>
    );
};

export default UserRouting;