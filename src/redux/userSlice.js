import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//import { login as runLogin } from "../services/UserService";
import {message} from "antd";
//import { history } from "../app/store";
import http from "../services/http";
import LocalStorageService from "../services/LocalStorageService";
import jwt from "jsonwebtoken";

const localStorage = LocalStorageService.getService();

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
    let response = null;
    response = await http.post("/login", {
        name: user.username,
        password: user.password,
    });
    return response.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: function () {
        //User state
        let state = {user: null, isFetching: false, isLogged: false};

        const token = localStorage.getAccessToken();
        if (token) {
            const decode = jwt.decode(token);
            if (Date.now() >= decode.iat * 1000) {
                state.user = {id: decode.id, jwt: token};
                state.isLogged = true;
            } else {
                localStorage.clearToken();
                state.isLogged = false;
            }
        } else {
            //redirect
            state.isLogged = false;
        }
        return state;
    }(),
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
            localStorage.clearToken();
        },
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [login.pending]: (state, action) => {
            state.isFetching = true;
        },
        [login.fulfilled]: (state, action) => {
            const token = action.payload.token;
            localStorage.setToken(token);
            const decode = jwt.decode(token);
            state.user = {id: decode.id, jwt: token};
            state.isFetching = false;
            state.isLogged = true;
        },
        [login.rejected]: (state, action) => {
            state.isFetching = false;
            state.user = null;
            message.error("Tên đăng nhập hoặc mật khẩu không hợp lệ", 1);
        },
    },
});

export const userSelector = (state) => state.user;
export const {logout} = userSlice.actions;
export default userSlice.reducer;
