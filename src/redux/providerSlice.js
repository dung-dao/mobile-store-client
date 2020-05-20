import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
// import http from "../services/http";
import axios from 'axios';

export const searchProvider = createAsyncThunk(
    "providers/search",
    async (provider) => {
        //get request
        const providers = await axios.get('http://localhost:8080/provider');
        return providers.data;
    }
)

export const createProvider = createAsyncThunk(
    "providers/create",
    async (provider) => {
        //post request
    }
)

export const updateProvider = createAsyncThunk(
    "providers/update",
    async (provider) => {
        //put request
    }
)

export const deleteProvider = createAsyncThunk(
    "providers/delete",
    async (provider) => {
        //delete request
    }
)

export const providersSlice = createSlice({
    name: "providers",
    initialState: {providers: [], detailProvider: null, isFetching: false, filter: {}},
    reducers: {},
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        //Search
        [searchProvider.pending]: (state, action) => {
            state.isFetching = true;
            console.log('fetching provider')
        },
        [searchProvider.fulfilled]: (state, action) => {
            state.isFetching = false;
            if (JSON.stringify(state.providers) === JSON.stringify(action.payload))
                return;
            state.providers = action.payload;
        },
        [searchProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Error occur');
        },

        //Create
        [createProvider.pending]: (state, action) => {

        },
        [createProvider.fulfilled]: (state, action) => {

        },
        [createProvider.rejected]: (state, action) => {

        },

        //Update
        [updateProvider.pending]: (state, action) => {

        },
        [updateProvider.fulfilled]: (state, action) => {

        },
        [updateProvider.rejected]: (state, action) => {

        },

        //Delete
        [deleteProvider.pending]: (state, action) => {

        },
        [deleteProvider.fulfilled]: (state, action) => {

        },
        [deleteProvider.rejected]: (state, action) => {

        },
    },
});

export const providersSelector = (state) => state.providers;
export const {} = providersSlice.actions;
const providerRoot = providersSlice.reducer;
export default providerRoot;
