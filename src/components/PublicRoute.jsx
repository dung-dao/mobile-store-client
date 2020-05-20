import React from "react";
import {userSelector} from "../redux";
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const userSlice = useSelector(userSelector);
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route
            {...rest}
            render={(props) =>
                userSlice.isLogged ? (
                    <Redirect to="/"/>
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
