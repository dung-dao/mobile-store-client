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
import {useDispatch, useSelector} from "react-redux";
import {authUser, logout, permissionSelector, userSelector} from "../../redux";
import LoadingPage from "../../components/common/LoadingPage";
import CategoryRouting from "../Category/CategoryRouting";
import {checkPermission} from "../../utils/Permission";

const AppPage = (props) => {
    const permissions = useSelector(permissionSelector);
    const [init, setInit] = useState(false);
    const [fetch, setFetch] = useState(false);
    const dispatch = useDispatch();

    const providerPer = checkPermission(permissions, 'READ', 'providers');
    const productPer = checkPermission(permissions, 'READ', 'products');
    const customerPer = checkPermission(permissions, 'READ', 'customers');
    const userPer = checkPermission(permissions, 'READ', 'users');
    const orderPer = checkPermission(permissions, 'READ', 'orders');
    const importPer = checkPermission(permissions, 'READ', 'imports');
    const _user = useSelector(userSelector);


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
                {providerPer ? <Route
                    path={"/providers"} render={(props) => {
                    return <ProviderRouting {...props}/>
                }}
                /> : null}

                {_user?.user?.role === 'salesman' || customerPer ?
                    <Route
                        path={"/customers"}
                        render={(props) => {
                            return <CustomerRouting {...props}/>
                        }}/>
                    : null}

                {orderPer || _user?.user?.role === 'salesman' ? <Route path={"/orders"} render={(props) => {
                    return <OrderRouting {...props}/>
                }}/> : null}


                {importPer || _user?.user?.role === 'warehouseman' ? <Route path={"/imports"} render={(props) => {
                    return <ImportsRouting{...props}/>
                }}/> : null}

                {userPer ? <Route path={"/users"} render={(props) => {
                    return <UserRouting {...props}/>
                }}/> : null}

                <Route path={"/products"} render={(props) => {
                    return <ProductRouting {...props}/>
                }}/>

                {productPer ? <Route path={"/categories"} render={(props) => {
                    return <CategoryRouting {...props}/>
                }}/> : null}

                <Route path="/" component={DashBoard}/>
            </Switch>
        </AppLayout>
    );
};

export default AppPage;
