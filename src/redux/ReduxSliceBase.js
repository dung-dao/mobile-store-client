import {createAsyncThunk} from "@reduxjs/toolkit";
import http from "../services/http";
import {message} from "antd";
import {searchCustomer} from "./customerSlice";
import {generateKey} from "../utils/ObjectUtils";

// export const getAll = async (resourceUrl) => {
//     const items = await http.get(resourceUrl);
//     return generateKey(items.data);
// }

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

//CREATE
export const createThunkBase = (resourceName) => createAsyncThunk(
    `${resourceName}/create`,
    async (item) => {
        return (await http.post("/" + resourceName, item)).data;
    }
);

export const createERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        state.items.push({...action.payload});
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
        return (await http.put(`${"/" + resourceName}/${item['id']}`, item)).data;
    }
);

export const updateERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.items = action.payload;
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        const update = action.payload;
        state.items = state.items.map(item => (item.id === update.id ? update : item));
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
        return (await http.delete(`${"/" + resourceName}/${item['id']}`)).data;
    }
);

export const deleteERBase = (thunk) => ({
    [thunk.pending]: (state, action) => {
        state.isFetching = true;
    },
    [thunk.fulfilled]: (state, action) => {
        const deletedItem = action.payload;
        state.items = state.items.filter(item => (item.id.toString() !== deletedItem.id));
        state.isFetching = false;
    },
    [thunk.rejected]: (state, action) => {
        state.isFetching = false;
        console.log(state, action);
        message.error('Đã xảy ra lỗi');
    },
});

export const initialStateBase = () => ({items: [], detailItem: null, isFetching: false, filter: {}});