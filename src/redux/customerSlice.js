import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
import http from "../services/http";

const resourceName = "customers";

const getAll = async () => {
    const customers = await http.get("/" + resourceName);
    return customers.data;
}

export const searchCustomer = createAsyncThunk(
    `${resourceName}/search`,
    async (item) => {
        const customers = await http.get("/" + resourceName, {
            params: {...item}
        });
        return customers.data;
    }
);

export const createCustomer = createAsyncThunk(
    `${resourceName}/create`,
    async (item) => {
        return await http.post("/" + resourceName, item);
    }
);

export const updateCustomer = createAsyncThunk(
    `${resourceName}/update`,
    async (item) => {
        return await http.put(`${"/" + resourceName}/${item['id']}`, item);
    }
);

export const deleteCustomer = createAsyncThunk(
    `${resourceName}/delete`,
    async (item) => {
        const customer = await http.delete(`${"/" + resourceName}/${item['id']}`);
        return await getAll();
    }
);

export const customerSlice = createSlice({
    name: resourceName,
    initialState: {
        customers: [],
        detailCustomer: null,
        isFetching: false,
        filter: {}
    },
    reducers: {},
    extraReducers: {
        //SEARCH
        [searchCustomer.pending]: (state, action) => {
            state.isFetching = true;
        },
        [searchCustomer.fulfilled]: (state, action) => {
            state.isFetching = false;
            state[resourceName] = action.payload;
        },
        [searchCustomer.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //CREATE
        [createCustomer.pending]: (state, action) => {
            state.isFetching = true;
        },
        [createCustomer.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [createCustomer.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //UPDATE
        [updateCustomer.pending]: (state, action) => {
            state.isFetching = true;
        },
        [updateCustomer.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [updateCustomer.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //DELETE
        [deleteCustomer.pending]: (state, action) => {
            state.isFetching = true;
        },
        [deleteCustomer.fulfilled]: (state, action) => {

            state.isFetching = false;
            state[resourceName] = action.payload;
            // console.log('payload', action.payload);
        },
        [deleteCustomer.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },
    },
});

export const customerSelector = (state) => state[resourceName];
export const {} = customerSlice.actions;
const customerRoot = customerSlice.reducer;
export default customerRoot;
