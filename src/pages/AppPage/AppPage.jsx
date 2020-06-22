import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import AppLayout from "../../layouts/AppLayout";
import CustomerRouting from "../Customers/CustomerRouting";
import DashBoard from "../HomePage/DashBoard";
import ImportsRouting from "../Orders/imports/ImportsRouting";
import UserRouting from "../Users/UserRouting";
import OrderRouting from "../Orders/orders/OrderRouting";
import ProductRouting from "../Product/ProductRouting";
import ProviderRouting from "../Providers/ProviderRouting";
import {useDispatch} from "react-redux";
import {authUser, logout} from "../../redux";
import LoadingPage from "../../components/common/LoadingPage";

const AppPage = (props) => {
    const [init, setInit] = useState(false);
    const [fetch, setFetch] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!init) {
            setFetch(true);
            setInit(true);
            dispatch(authUser()).then(() => {
                setFetch(false);
            }).catch(error => {
                dispatch(logout());
                setFetch(false);
            });
        }
    });

    if (fetch)
        return <LoadingPage fullScreen={true}/>

    return (
        <AppLayout>
            <Switch>
                <Route
                    path={"/providers"} render={(props) => {
                    return <ProviderRouting {...props}/>
                }}
                />
                <Route
                    path={"/customers"}
                    render={(props) => {
                        return <CustomerRouting {...props}/>
                    }}/>
                <Route
                    path={"/orders"}
                    render={(props) => {
                        return <OrderRouting {...props}/>
                    }}/>

                <Route
                    path={"/imports"}
                    render={(props) => {
                        return <ImportsRouting{...props}/>
                    }}
                />

                <Route
                    path={"/users"}
                    render={(props) => {
                        return <UserRouting {...props}/>
                    }}/>
                <Route
                    path={"/products"}
                    render={(props) => {
                        return <ProductRouting {...props}/>
                    }}/>
                <Route path="/" component={DashBoard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;
