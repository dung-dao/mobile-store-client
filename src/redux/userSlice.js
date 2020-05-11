import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { login as runLogin } from "../services/UserService";
import { message } from "antd";
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
  localStorage.setToken(response.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isFetching: false, isLogged: false },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    logout: (state) => {
      state.user = null;
      try {
        //localStorage.removeItem("token");
      } catch (error) {
        //console.log(error);
        return null;
      }
      return null;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [login.pending]: (state, action) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, action) => {
      // Add user to the state array
      state.user = action.payload;
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

export default userSlice.reducer;
