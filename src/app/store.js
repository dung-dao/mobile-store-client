import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {routerMiddleware, connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import userSlice from "../redux/UserSlice";
import providerRoot from "../redux/ProviderSlice";
import customerRoot from "../redux/CustomerSlice";
import allUsersRoot from "../redux/AllUsersSlice";
import productRoot from "../redux/ProductSlice";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: {
        router: connectRouter(history),
        user: userSlice,
        providers: providerRoot,
        customers: customerRoot,
        users: allUsersRoot,
        products: productRoot
    },
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});

export default store;