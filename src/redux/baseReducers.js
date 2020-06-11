import {createAsyncThunk} from "@reduxjs/toolkit";
import http from "../services/http";
import {message} from "antd";
import {searchCustomer} from "./customerSlice";
import {generateKey} from "../utils/ObjectUtils";

export const getAll = async (resourceUrl) => {
    const items = await http.get(resourceUrl);
    return generateKey(items.data);
}

export const searchThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/search`,
    async (item) => {
        const items = await http.get("/" + resourceName, {
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
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

export const getByIdThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/getById`,
    async (id) => {
        const item = await http.get(`${"/" + resourceName}/${id}`);
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

export const createThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/create`,
    async (provider) => {
        await http.post("/" + resourceName, provider);
        return await getAll();
    }
);

export const createERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

export const updateThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/update`,
    async (item) => {
        await http.put(`${"/" + resourceName}/${item['id']}`, item);
        return await getAll();
    }
);

export const updateERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.items = action.payload;
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

export const deleteThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/delete`,
    async (item) => {
        await http.delete(`${"/" + resourceName}/${item['id']}`);
        return await getAll();
    }
);

export const deleteERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        message.error('Đã xảy ra lỗi');
    },
});

export const initialStateBase = () => ({items: [], detailItem: null, isFetching: false, filter: {}});