import React from "react";
import {Route, Redirect} from "react-router-dom";
import {userSelector} from "../redux";
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
    const userSlice = useSelector(userSelector);
    console.log(userSlice.isLogged)
    return (
        <Route
            {...rest}
            render={(props) =>
                userSlice.isLogged ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin"/>
                )
            }
        />
    );
};

export default PrivateRoute;
