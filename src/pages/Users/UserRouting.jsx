import React from 'react';
import {Route, Switch} from "react-router-dom";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import {useDispatch} from "react-redux";
import {searchUser} from "../../redux/AllUsersSlice";

const resourceName = 'users';

const UserRouting = (props) => {
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
