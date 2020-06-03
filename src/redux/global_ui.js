import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "global_ui",
    initialState: {menu_selected_keys: 1},
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
            localStorage.clearToken();
        },
    }
});

export const global_ui_Selector = (state) => state.user;
export const {} = userSlice.actions;
export default userSlice.reducer;
