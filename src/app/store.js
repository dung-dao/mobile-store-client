import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {routerMiddleware, connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import userSlice from "../redux/userSlice";
import providerRoot from "../redux/providerSlice";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: {
        router: connectRouter(history),
        user: userSlice,
        providers: providerRoot
    },
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});

export default store;