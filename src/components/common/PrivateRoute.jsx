import React from "react";
import {Redirect, Route} from "react-router-dom";
import {userSelector} from "../../redux";
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, hook, ...rest}) => {
    const userSlice = useSelector(userSelector);
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (hook)
                        hook();
                    return userSlice.isLogged ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/signin"/>
                    )
                }
            }
        />
    );
};

export default PrivateRoute;
