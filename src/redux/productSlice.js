import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
import http from "../services/http";

const resourceUrl = "/products";
const resourceName = 'products';

const getAll = async () => {
    const items = await http.get(resourceUrl);
    return items.data;
}

export const searchProduct = createAsyncThunk(
    `${resourceName}/search`,
    async (item) => {
        const items = await http.get(resourceUrl, {
            params: {...item}
        });
        return items.data;
    }
);

export const getProductById = createAsyncThunk(
    `${resourceName}/getById`,
    async (id) => {
        const item = await http.get(`${resourceUrl}/${id}`);
        return item.data;
    }
);

export const createProduct = createAsyncThunk(
    `${resourceName}/create`,
    async (provider) => {
        await http.post(resourceUrl, provider);
        return await getAll();
    }
);

export const updateProduct = createAsyncThunk(
    `${resourceName}/update`,
    async (item) => {
        await http.put(`${resourceUrl}/${item['id']}`, item);
        return await getAll();
    }
);

export const deleteProduct = createAsyncThunk(
    `${resourceName}/delete`,
    async (item) => {
        await http.delete(`${resourceUrl}/${item['id']}`);
        return await getAll();
    }
);

export const productSlice = createSlice({
    name: resourceName,
    initialState: {
        items: [],
        detailItem: null,
        isFetching: false,
        filter: {}
    },
    reducers: {},
    extraReducers: {
        //Search
        [searchProduct.pending]: (state, action) => {
            state.isFetching = true;
        },
        [searchProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.items = action.payload;
        },
        [searchProduct.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Create
        [createProduct.pending]: (state, action) => {
            state.isFetching = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
        },
        [createProduct.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Update
        [updateProduct.pending]: (state, action) => {
            state.items = action.payload;
            state.isFetching = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [updateProduct.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //Delete
        [deleteProduct.pending]: (state, action) => {
            state.isFetching = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },

        //View Detail
        [getProductById.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getProductById.fulfilled]: (state, action) => {
            state.detailItem = action.payload;
            state.isFetching = false;
        },
        [getProductById.rejected]: (state, action) => {
            state.isFetching = false;
            message.error('Đã xảy ra lỗi');
        },
    },
});

export const productSelector = (state) => state.providers;
export const {} = productSlice.actions;
const productRoot = productSlice.reducer;
export default productRoot;
