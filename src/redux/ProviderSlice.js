import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {message} from "antd";
import http from "../services/http";

const resourceUrl = "/providers";

const getAll = async () => {
    const providers = await http.get(resourceUrl);
    return providers.data;
}

export const searchProvider = createAsyncThunk(
    "providers/search",
    async (provider) => {
        const providers = await http.get(resourceUrl, {
            params: {...provider}
        });
        return providers.data;
    }
);

export const getProviderById = createAsyncThunk(
    "providers/getById",
    async (id) => {
        const provider = await http.get(`${resourceUrl}/${id}`);
        return provider.data;
    }
);

export const createProvider = createAsyncThunk(
    "providers/create",
    async (provider) => {
        await http.post(resourceUrl, provider);
        return await getAll();
    }
);

export const updateProvider = createAsyncThunk(
    "providers/update",
    async (provider) => {
        await http.put(`${resourceUrl}/${provider.id}`, provider);
        return provider;
    }
);

export const deleteProvider = createAsyncThunk(
    "providers/delete",
    async (provider) => {
        await http.delete(`${resourceUrl}/${provider.id}`);
        return await getAll();
    }
);

export const providersSlice = createSlice({
    name: "providers",
    initialState: {
        providers: [],
        currentProvider: null,
        detailProvider: null,
        isFetching: false,
        filter: {}
    },
    reducers: {
        clearProviderSelect: state => {
            state.detailProvider = null;
            // state.currentProvider = null;
        }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        //Search
        [searchProvider.pending]: (state, action) => {
            state.isFetching = true;
        },
        [searchProvider.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.providers = action.payload;
        },
        [searchProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Create
        [createProvider.pending]: (state, action) => {
            state.isFetching = true;
            console.log('creating provider')
        },
        [createProvider.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.providers = action.payload;
            message.success('Đã tạo thành công');
        },
        [createProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Update
        [updateProvider.pending]: (state, action) => {
            state.isFetching = true;
            console.log('updating provider')
        },
        [updateProvider.fulfilled]: (state, action) => {
            const updated = action.payload;
            state.providers = state.providers.map(item => item.id === updated.id ? updated : item);
            state.isFetching = false;
            message.success('Cập nhật thành công');
        },
        [updateProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Delete
        [deleteProvider.pending]: (state, action) => {
            state.isFetching = true;
        },
        [deleteProvider.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.providers = action.payload;
            message.success('Đã xóa');
        },
        [deleteProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //View Detail
        [getProviderById.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getProviderById.fulfilled]: (state, action) => {
            state.currentProvider = action.payload;
            state.isFetching = false;
        },
        [getProviderById.rejected]: (state, action) => {
            // state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },
    },
});

export const providerSelector = (state) => state.providers;
export const currentProviderSelector = (state) => state.providers.currentProvider;
export const isFetchingSelector = (state) => state.providers.isFetching;
export const {clearProviderSelect} = providersSlice.actions;
const providerRoot = providersSlice.reducer;
export default providerRoot;
