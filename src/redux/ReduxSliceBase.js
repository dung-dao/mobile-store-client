import {createAsyncThunk} from "@reduxjs/toolkit";
import http from "../services/http";
import {message} from "antd";
import {searchCustomer} from "./customerSlice";
import {generateKey} from "../utils/ObjectUtils";

export const searchThunkBase = (resourceName, resourceURL) => createAsyncThunk(
    `${resourceName}/search`,
    async (item) => {
        const items = await http.get(!resourceURL ? "/" + resourceName : resourceURL, {
            params: {...item}
        });
        return generateKey(items.data);
    }
);

export const searchERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.items = action.payload;
        state.detailItem = null;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        state.detailItem = null;
        message.error('Đã xảy ra lỗi');
    },
});

export const getByIdThunkBase = (resourceName, resourceURL) => createAsyncThunk(
    `${resourceName}/getById`,
    async (id) => {
        const item = await http.get(`${!resourceURL ? "/" + resourceName : resourceURL}/${id}`);
        return item.data;
    }
);

export const getByIdERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.detailItem = action.payload;
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

//CREATE
export const createThunkBase = (resourceName, resourceURL) => createAsyncThunk(
    `${resourceName}/create`,
    async (item) => {
        return (await http.post(!resourceURL ? "/" + resourceName : resourceURL, item)).data;
    }
);

export const createERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.items.push({...action.payload});
        state.detailItem = null;
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        state.detailItem = null;
        message.error('Đã xảy ra lỗi');
    },
});

export const updateThunkBase = (resourceName, resourceURL) => createAsyncThunk(
    `${resourceName}/update`,
    async (item) => {
        await http.put(`${!resourceURL ? "/" + resourceName : resourceURL}/${item['id']}`, item);
        return item;
    }
);

export const updateERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.items = action.payload;
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        const update = action.payload;
        if (state.items)
            state.items = state.items.map(item => (item.id === update.id ? update : item));
        state.detailItem = null;
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        state.detailItem = null;
        message.error('Đã xảy ra lỗi');
    },
});

export const deleteThunkBase = (resourceName, resourceURL) => createAsyncThunk(
    `${resourceName}/delete`,
    async (item) => {
        await http.delete(`${!resourceURL ? "/" + resourceName : resourceURL}/${item['id']}`);
        return item;
    }
);

export const deleteERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.detailItem = null;
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        const deletedItem = action.payload;
        if (state.items)
            state.items = state.items.filter(item => (item.id !== deletedItem.id));
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

export const initialStateBase = () => ({items: [], detailItem: null, isFetching: false, filter: {}});