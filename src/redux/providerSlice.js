import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
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

export const createProvider = createAsyncThunk(
    "providers/create",
    async (provider) => {
        return await http.post(resourceUrl, provider);
    }
);

export const updateProvider = createAsyncThunk(
    "providers/update",
    async (provider) => {
        return await http.put(`${resourceUrl}/${provider.id}`, provider);
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
        detailProvider: null,
        isFetching: false,
        filter: {}
    },
    reducers: {},
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
            state.upToDate = false;
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
            state.isFetching = false;
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
        },
        [deleteProvider.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },
    },
});

export const providersSelector = (state) => state.providers;
export const {} = providersSlice.actions;
const providerRoot = providersSlice.reducer;
export default providerRoot;
