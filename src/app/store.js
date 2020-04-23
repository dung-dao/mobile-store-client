import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
//import { routerMiddleware } from "connected-react-router";
//import createHistory from "history/createBrowserHistory";
import userSlice from "../redux/userSlice";

//export const history = createHistory();

//const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

export default configureStore({
  reducer: {
    user: userSlice
  }
  //middleware
});
