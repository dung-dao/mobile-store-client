import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {routerMiddleware, connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import userSlice from "../redux/userSlice";
import providerRoot from "../redux/providerSlice";
import customerRoot from "../redux/customerSlice";
import productRoot from "../redux/productSlice";
import allUsersRoot from "../redux/allUsersSlice";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: {
        router: connectRouter(history),
        user: userSlice,
        providers: providerRoot,
        customers: customerRoot,
        products: productRoot,
        users: allUsersRoot
    },
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});

export default store;