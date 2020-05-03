import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { login as runLogin } from "../services/UserService";
import { message } from "antd";
//import { history } from "../app/store";
import fetch from "../services/http";

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  let response = null;
  response = await fetch("post", "http://localhost:3000/login", {
    name: user.username,
    password: user.password,
  });
  console.log(response);
});

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isFetching: false, error: null },
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
      if (action.payload != null) {
        console.log(action.payload);
        state.user = action.payload;
      } else {
        state.error = "False username or password";
      }
      state.isFetching = false;
    },
    [login.rejected]: (state, action) => {
      state.isFetching = false;
      state.user = null;
      message.error("False user name or password", 1);
    },
  },
});

export const userSelector = (state) => state.user;

export default userSlice.reducer;
