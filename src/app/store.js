import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import userSlice from "../redux/UserSlice";
import providerRoot from "../redux/ProviderSlice";
import customerRoot from "../redux/CustomerSlice";
import allUsersRoot from "../redux/AllUsersSlice";
import productRoot from "../redux/ProductSlice";
import orderRoot from "../redux/OrderSlice";
import categoryRoot from "../redux/CategorySlice";
import manufactureRoot from "../redux/manufactureSlice";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: {
        router: connectRouter(history),
        user: userSlice,
        providers: providerRoot,
        customers: customerRoot,
        users: allUsersRoot,
        products: productRoot,
        orders: orderRoot,
        categories: categoryRoot,
        manufacture: manufactureRoot
    },
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});

export default store;
